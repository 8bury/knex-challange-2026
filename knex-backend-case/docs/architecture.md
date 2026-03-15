# Decisões de Arquitetura e Design — Knex Sales Platform

> Documentação das escolhas técnicas feitas durante o planejamento do backend da plataforma de vendas corporativas Knex.

---

## 1. Visão Geral

A Knex Sales Platform é uma API RESTful stateless que permite empresas cadastrarem seus produtos e clientes comprarem de várias delas em um só lugar. A autenticação é via JWT e o sistema de autorização garante que colaboradores só alteram o catálogo da própria empresa.

**Stack escolhida:** Node.js + TypeScript + Express + Prisma + PostgreSQL + Docker

---

## 2. Arquitetura

### Padrão adotado: Arquitetura em Camadas

Foi escolhida uma arquitetura em camadas com inspiração em Clean Architecture, mas sem over-engineering. A motivação foi encontrar o equilíbrio entre demonstrar conhecimento de SOLID/POO e não adicionar cerimônia desnecessária para o escopo do case.

**Alternativas descartadas:**

- **Clean Architecture completa (Hexagonal/Ports & Adapters):** Adicionaria muita cerimônia (pastas, interfaces, mappers) sem ganho real para um sistema deste porte. O risco seria aplicar padrões por aplicar.
- **MVC simples:** Muito direto, mas se perderia a oportunidade de demonstrar separação de responsabilidades e inversão de dependência.
- **DDD completo (tactical patterns):** Aggregates, Value Objects, Domain Events seriam overkill para o domínio. O domínio é simples demais para justificar essa formalidade. Porém, foi incorporado o que há de bom no DDD de forma leve: linguagem ubíqua, entidades com comportamento, e regras de negócio fora dos controllers.

### Camadas

As dependências sempre apontam "para dentro" — das camadas externas para as internas.

**HTTP Layer** → Recebe requests, passa pelos middlewares (autenticação JWT, validação de input), roteia e chega no Controller. O Controller só lida com req/res — nunca contém lógica de negócio.

**Application Layer** → Services (Use Cases) contêm a lógica de negócio. Consultam a Authorization para verificar permissões. Orquestram chamadas aos Repositories.

**Domain Layer** → Camada pura TypeScript, sem dependências de framework. Contém as Entities (objetos de domínio com comportamento), Domain Errors (exceções tipadas), Repository Interfaces (ports), e DTOs de entrada/saída.

**Infrastructure Layer** → Prisma Repositories implementam as interfaces definidas no Domain. Prisma Client é o ORM concreto. Esta camada é a única que conhece o Prisma.

**External** → PostgreSQL, JWT/bcrypt, Docker.

### Decisão: Entidades de domínio próprias (não usar tipos do Prisma)

As entidades de domínio vivem em `domain/entities/` e são classes TypeScript puras com comportamento. Os tipos gerados pelo Prisma não são usados diretamente no código de negócio.

**Motivação:**

- Isolamento: se trocar o Prisma por outro ORM, só muda o Repository.
- POO de verdade: entidades com métodos comportamentais (`changeName()`, `deactivate()`) em vez de objetos anêmicos.
- Encapsulamento: campos sensíveis como `passwordHash` são `private`, só acessíveis via métodos.
- Os Repositories fazem o mapeamento Prisma ↔ Entidade de domínio internamente.

---

## 3. Modelagem de Domínio

### Entidades

O sistema possui 4 entidades, conforme requisitos do case.

**User**

| Campo | Tipo | Observações |
|---|---|---|
| id | UUID (PK) | Gerado pela aplicação |
| name | string | |
| email | string (unique) | |
| passwordHash | string | Private, nunca exposto |
| companyId | UUID (FK) \| null | Vínculo 1:1 com Company |
| active | boolean | Soft delete |
| createdAt | timestamp | |
| updatedAt | timestamp | |

**Company**

| Campo | Tipo | Observações |
|---|---|---|
| id | UUID (PK) | |
| name | string | |
| createdAt | timestamp | |
| updatedAt | timestamp | |

**Product**

| Campo | Tipo | Observações |
|---|---|---|
| id | UUID (PK) | |
| name | string | |
| description | text | |
| price | decimal | |
| stock | integer | Controle de estoque |
| companyId | UUID (FK) | Pertence a uma empresa |
| deletedAt | timestamp \| null | Soft delete |
| createdAt | timestamp | |
| updatedAt | timestamp | |

**Transaction**

| Campo | Tipo | Observações |
|---|---|---|
| id | UUID (PK) | |
| userId | UUID (FK) | Quem comprou |
| productId | UUID (FK) | O que comprou |
| quantity | integer | |
| unitPrice | decimal | Snapshot do preço no momento da compra |
| createdAt | timestamp | |

### Relacionamentos

- **User → Company:** 1:1 opcional. O campo `companyId` fica diretamente no User. Se `companyId` é `null`, o user é consumidor puro.
- **Product → Company:** N:1. Cada produto pertence a uma empresa.
- **Transaction → User:** N:1. Cada transação tem um comprador.
- **Transaction → Product:** N:1. Cada transação referencia um produto.

### Decisões de modelagem

**Vínculo User ↔ Company como 1:1 (companyId no User):**
Foi adotado o modelo 1:1 porque reflete melhor a regra de negócio: no contexto da plataforma, cada usuário atua como colaborador de no máximo uma empresa. Um vínculo N:N permitiria cenários que não fazem sentido para o domínio (um colaborador gerenciando catálogos de múltiplas empresas simultaneamente). Além disso, a autorização fica direta e expressiva: basta checar `user.companyId === product.companyId`.

**Nome de empresa único:**
O campo `name` da Company possui constraint `@unique` no banco. Tentativas de criar duas empresas com o mesmo nome retornam `DuplicateCompanyNameError`. A unicidade é garantida tanto no banco quanto na camada de serviço.

**Sem campo role:**
Como o vínculo é 1:1, não há necessidade de diferenciar papéis. Se o user tem `companyId` preenchido, é colaborador daquela empresa. Se é `null`, é consumidor.

**UUID em todas as entidades:**
UUIDs não expõem sequência nem volume de dados, podem ser gerados no código antes do INSERT, e são o padrão mais comum em APIs modernas. A diferença de performance em relação a auto-increment é irrelevante nesta escala.

**Soft delete em Products, hard delete em Companies:**
Products usam soft delete (`deletedAt`) porque Transactions referenciam produtos — deletar fisicamente quebraria o histórico de compras. Companies usam hard delete porque o endpoint exige que não haja membros nem produtos associados como pré-condição.

**Snapshot de preço na Transaction:**
O campo `unitPrice` é gravado no momento da compra. Se o preço do produto mudar depois, o histórico permanece correto.

---

## 4. Endpoints

### Convenções REST adotadas

**Create de produto aninhado, operações flat:**
`POST /companies/:companyId/products` expressa a hierarquia (produto pertence a empresa) na criação. Os demais endpoints de produto (`GET`, `PUT`, `DELETE`) são flat (`/products/:id`) porque o produto tem identidade própria — o ID é suficiente para identificá-lo, e a empresa é validada no Service via `user.companyId`.

**Join/Leave como ações semânticas:**
Mesmo com vínculo 1:1, foram mantidos `POST /companies/:id/join` e `POST /companies/:id/leave` em vez de um simples `PUT /users/me`. São ações de negócio, não updates de campo. O `:id` na URL do leave é tecnicamente redundante (o servidor sabe qual empresa o user pertence), mas serve como confirmação explícita de intenção e mantém simetria com o join.

**Criação de Company não vincula o criador:**
Qualquer user logado pode criar uma empresa, mas não se torna membro automaticamente. O vínculo é feito via `POST /companies/:id/join`. Isso mantém as responsabilidades separadas.

### Prefixo de rota

Todos os endpoints são servidos sob o prefixo `/api`. Ex: `POST /api/auth/register`.

### Lista completa de endpoints (19 rotas)

**Health (1 rota)**

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| GET | /health | Público | Healthcheck da API |

**Auth (3 rotas)**

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| POST | /auth/register | Público | Cadastro de usuário |
| POST | /auth/login | Público | Autenticação, retorna JWT |
| GET | /auth/profile | Autenticado | Dados do usuário logado |

**Companies (4 rotas)**

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| POST | /companies | Autenticado | Criar empresa |
| GET | /companies | Autenticado | Listar empresas |
| GET | /companies/:id | Autenticado | Detalhe da empresa |
| DELETE | /companies/:id | Autenticado | Deletar (se sem membros/produtos) |

**Company Membership (3 rotas)**

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| POST | /companies/:id/join | Autenticado (sem empresa) | Entrar numa empresa |
| POST | /companies/:id/leave | Membro da empresa | Sair da empresa |
| GET | /companies/:id/members | Autenticado | Listar membros |

**Products (5 rotas)**

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| POST | /companies/:companyId/products | Membro da empresa | Criar produto |
| GET | /products | Autenticado | Listar produtos (filtro, busca, paginação) |
| GET | /products/:id | Autenticado | Detalhe do produto |
| PUT | /products/:id | Membro da empresa do produto | Atualizar produto |
| DELETE | /products/:id | Membro da empresa do produto | Soft delete |

**Transactions (3 rotas)**

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| POST | /transactions | Autenticado | Comprar produto |
| GET | /transactions | Autenticado | Minhas compras |
| GET | /companies/:id/transactions | Membro da empresa | Vendas da empresa |

---

## 5. Autorização

O sistema de permissão é simples e baseado no campo `user.companyId`:

| Regra | Implementação |
|---|---|
| Leitura (listar/ver produtos, empresas) | Qualquer user autenticado |
| Escrita (criar/editar/deletar produto) | `user.companyId === product.companyId` |
| Compras | Qualquer user autenticado |
| Vendas da empresa | `user.companyId === :id` da URL |
| Join | `user.companyId` deve ser `null` |
| Leave | `user.companyId` deve ser igual ao `:id` da URL |

---

## 6. Infraestrutura

- **PostgreSQL** como banco relacional.
- **Prisma** como ORM, isolado na camada de infraestrutura.
- **JWT** para autenticação stateless.
- **bcrypt** para hash de senhas.
- **Docker** para containerização da aplicação e do banco.