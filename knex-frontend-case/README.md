# Teste Técnico - Frontend

> Knex Empresa Júnior de Computação

## Avaliação

Este teste é uma oportunidade para você demonstrar seus conhecimentos em desenvolvimento Frontend, boas práticas de programação e implementação de formulários e tratamentos de dados de API's. Avaliaremos diversos aspectos do seu código e da implementação da solução. Lembrando que não é necessário concluir tudo do projeto, fazer o que conseguir!

## Instruções

- Desenvolva a solução utilizando **React** + framework à sua escolha.
- Utilize uma biblioteca para gerenciamento de formulários (React Hook Form, Formik, entre outros).
- Utilize um client HTTP para as requisições (Axios, Got, entre outros).
- Utilize uma biblioteca para validação de dados (Zod, Yup, entre outros).
- Você pode utilizar quaisquer outras bibliotecas que considerar necessárias.
- Adicione um arquivo README.md com instruções claras de como executar sua aplicação.
- O desenvolvimento deve ser individual.

## Desafio

Desenvolver um **site vitrine** que terá uma página de cadastro/login de admin e que permitirá realizar um **CRUD (CREATE, READ, UPDATE, DELETE)** nos produtos e depoimentos de clientes de uma Loja de Doces. O site pode seguir o [Protótipo Cup&Cake](https://www.figma.com/design/YjLww6Z985i2Np8jZHF1yo/Cup-Cake--Copy-?node-id=0-1&p=f&t=6p5VyZSMy3kEAbrS-0) (Figma) ou criar seu próprio site vitrine utilizando ele como modelo.

Cada participante deve implementar **seu próprio frontend** consumindo a API do projeto. O intuito é que cada um construa a interface à sua maneira: stack, design e organização ficam por sua conta. O que unifica o case são os fluxos e as funcionalidades descritas abaixo.

### A solução deve focar em três pontos principais

1. **Implementação dos formulários** de login, cadastro e inserção de dados.
2. **Validações em tempo real** com feedback visual claro.
3. **Confirmação de envios** e atualização da página.

### Do usuário do sistema principal

1. **Informações do usuário** — Fazer requisições na API e apresentar, de forma estética e coesa, as informações da Loja do usuário "logado":
   - Nome dos produtos
   - Foto dos produtos
   - Preço
   - Nome do cliente
   - Foto do cliente
   - Depoimento

2. **Do Token** — Guardar em **Cookies** o token (ex.: SHA256) gerado pela requisição para persistência do usuário.
   - A rota da página de gerenciamento da Loja deve ser **protegida**, sendo acessada somente com a presença do token.

### Requisitos gerais de validação

- Feedback visual imediato para o usuário.
- Mensagens de erro claras e específicas.
- Validação em tempo real nos campos.
- Validar formulário completo antes do envio final.

---

## Visão geral (implementação)

- **Autenticação:** tela padrão de **login** e **registro** (como cada um quiser estilizar).
- **Após o login:** duas perspectivas principais:
  1. **Visualização** — uma “landing” da loja (somente leitura), acessível apenas logado.
  2. **Gestão** — painel onde o usuário faz o CRUD de produtos (criar, listar, editar, excluir).

A API a ser consumida está documentada em: **`knex-frontend-api-to-consume/README.md`** (rotas, payloads, autenticação).

---

## O que implementar

### 1. Páginas de autenticação (públicas)

- **Registro**
  - Formulário: nome, email, senha.
  - Chamar `POST /auth/register`.
  - Após sucesso, redirecionar para login ou já logar automaticamente, como preferir.

- **Login**
  - Formulário: email, senha.
  - Chamar `POST /auth/login`.
  - Guardar o **token** retornado (ex.: Cookies, localStorage, sessionStorage, contexto) e usá-lo no header `Authorization` em todas as requisições protegidas.

Rotas e layout (uma página, duas abas, etc.) ficam a seu critério.

---

### 2. Área logada — Duas “abas” ou seções

Acesso apenas para usuário autenticado. Se não houver token válido, redirecionar para login.

#### 2.1 Visualização (landing da loja)

- **Objetivo:** exibir os produtos da loja do usuário de forma **somente leitura**, como uma vitrine/landing.
- **Dados:** `GET /products` (com `Authorization: <token>`).
- **Exibição:** usar os dados retornados (nome, descrição, preço, imagem via `file.path`, `index` para ordenação, etc.) da forma que fizer mais sentido para você (grid, lista, cards, etc.).
- **URL da imagem:** `{baseUrl da API}/{file.path}` (ex.: `http://localhost:3000/abc-123_foto.jpg`).

Não é obrigatório ser uma “landing” no sentido de marketing; o importante é ser uma **visão de leitura** dos produtos, acessível só após login.

#### 2.2 Gestor de produtos (CRUD)

- **Listar:** mesma fonte `GET /products`, mas em uma interface de gestão (tabela, cards com ações, etc.).
- **Criar:**
  - Primeiro: upload da imagem com `POST /files` (multipart/form-data, campo `file`).
  - Depois: `POST /products` com `name`, `description`, `price`, `file_id` (UUID retornado em `/files`).
- **Atualizar:** `PUT /products/:product_id` com os campos que quiser alterar (`name`, `description`, `price`, `index` — todos opcionais).
- **Excluir:** `DELETE /products/:product_id`.

Fluxo de formulários (um modal, página separada, inline, etc.) e uso do campo `index` para ordenação ficam a seu critério.

---

## Resumo do que é esperado

| Item | Obrigatório |
|------|-------------|
| Página de registro | Sim |
| Página de login | Sim |
| Área de visualização (leitura dos produtos, só logado) | Sim |
| Gestor: listar produtos | Sim |
| Gestor: criar produto | Sim |
| Gestor: atualizar produto | Sim |
| Gestor: excluir produto | Sim |
| Consumir a API documentada em `knex-frontend-api-to-consume` | Sim |

**Livre:** tecnologia (React, Vue, Svelte, Angular, vanilla, etc.), design, estrutura de pastas, roteamento e estilo visual. O objetivo é cada um implementar o frontend consumindo a API da própria forma.

---

## Dica rápida de fluxo

1. Registrar → Login → guardar token (ex.: em Cookies).
2. Em toda requisição a `/products` e `/files`, enviar `Authorization: <token>`.
3. Upload de imagem → obter `file_id` → criar produto com esse `file_id`.
4. Na visualização e no gestor, usar `GET /products` e exibir imagens com `{baseUrl}/{file.path}`.

---

## O que não pode faltar neste projeto

- Uso de **ESLint** e **Prettier**
- Código limpo e semântico
- Componentização adequada
- Responsividade
- Tratamento de erros

## O que pode te destacar

- Uso de **TypeScript**
- Utilização de recursos modernos de UI
- **Deploy** da aplicação
- Animações fluidas nas transições

---

## Entrega

- O código deve ser disponibilizado em um repositório público no GitHub.
- Inclua instruções detalhadas de como rodar o projeto.
- Screenshots ou GIFs da aplicação funcionando.

## Prazo

O prazo para entrega está especificado no edital do processo seletivo.

## Contato

Em caso de dúvidas, utilize o canal de comunicação informado no início do processo seletivo.
