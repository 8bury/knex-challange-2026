# Case Backend — Plataforma de Vendas Corporativas

## A história

A **Knex** precisa de um sistema que permita às empresas cadastrarem seus produtos e aos clientes comprarem de várias delas em um só lugar.

Alguns usuários são **colaboradores** de uma empresa: além de comprar, eles podem cadastrar e manter o catálogo da própria empresa. Outros usuários são apenas **consumidores**: podem ver todos os produtos e comprar, mas não podem alterar o inventário de ninguém.

O sistema deve deixar claro **quem pode fazer o quê**: um colaborador da Apple não pode editar produtos da Samsung; qualquer pessoa logada pode ver todos os produtos e realizar compras.

## O problema que você vai resolver

Você deve **desenhar e implementar uma API RESTful e stateless** que atenda a esse cenário: use os verbos e recursos HTTP de forma adequada e não dependa de sessão guardada no servidor — cada requisição deve trazer as informações necessárias para ser entendida e autorizada sozinha. A autenticação deve ser feita com **JWT**. É obrigatório que a solução inclua um **sistema de autorização e permissão**: a API deve saber quem está fazendo a requisição e permitir ou negar cada ação de acordo com as regras de negócio (por exemplo, impedir que um colaborador edite produtos de outra empresa). A entrega é a solução funcionando e documentada; a avaliação será **a forma como você resolveu** — clareza, organização do código, respeito às regras de negócio e decisões que você tomar.

### Foco do case

O candidato deve concentrar-se na resolução destes três tópicos:

1. **Login e registro de usuários** — Cadastro de novos usuários e autenticação.
2. **Autenticação e autorização** — Identificar quem está fazendo a requisição e garantir que cada ação seja permitida ou negada conforme as regras (ex.: colaborador só altera produtos da própria empresa).
3. **CRUD de produtos e transações** — Criar, listar, editar e excluir produtos; registrar compras (transações) vinculando usuário e produto.

O case permanece aberto para decisões de modelagem e implementação, mas a solução deve cobrir esses três pontos de forma funcional.

---

## Regras de negócio

A aplicação deve implementar **autorização e permissão**: em cada operação, o sistema identifica quem está autenticado e verifica se essa pessoa pode executar a ação no recurso em questão. Abaixo, as regras que o sistema de permissão deve garantir:

- **Vínculo:** Um usuário pode ou não estar vinculado a uma empresa.
- **Escrita (criar, editar, excluir produtos):** Apenas usuários vinculados a uma empresa podem alterar o catálogo **dessa mesma empresa**. Não podem alterar produtos de outras empresas.
- **Leitura (listar/ver produtos):** Qualquer usuário autenticado pode ver produtos de qualquer empresa.
- **Compras:** Qualquer usuário autenticado pode realizar uma compra (registrar uma transação que relacione usuário e produto comprado).

---

## Cenários que a solução deve contemplar

### Cenário 1: Colaborador gerencia só a própria empresa

Arthur é colaborador da empresa **Apple**.

- **Deve ser permitido:** Arthur cadastra um produto "iPhone 15" vinculado à Apple.
- **Deve ser negado:** Arthur tenta editar o preço de um "Galaxy S24" da empresa **Samsung**. A API deve responder com erro de permissão.

### Cenário 2: Consumidor só compra

Maria não está vinculada a nenhuma empresa; é apenas consumidora.

- **Deve ser permitido:** Maria lista todos os produtos (Apple, Samsung, etc.).
- **Deve ser permitido:** Maria realiza a compra de um produto de qualquer empresa.

---

## Entidades

Sua API deve contemplar **no mínimo** as noções de domínio abaixo. Os nomes e a modelagem (tabelas, relacionamentos, campos) ficam a seu critério. O papel de cada uma no sistema:

- **Usuários** — Quem acessa o sistema: pode ser só consumidor (comprar e listar produtos) ou, se vinculado a uma empresa, também responsável pelo catálogo dessa empresa.
- **Empresas** — Donas do catálogo de produtos; usuários vinculados a uma empresa podem criar, editar e excluir apenas os produtos dessa empresa.
- **Produtos** — Itens à venda; cada produto pertence a uma empresa. Só colaboradores dessa empresa podem alterá-los.
- **Transações** — Registro de uma compra: qual usuário comprou qual produto.

**Isso é o mínimo.** Se para resolver bem o problema você precisar de outras entidades — por exemplo papéis de usuário, categorias de produto, carrinho, endereços — pode e deve criar. O que será avaliado é a coerência da solução com as regras de negócio, não a quantidade de tabelas.

---

## Entrega

- **Repositório:** Link do repositório (ex.: GitHub).
- **README:** Como rodar o projeto (ambiente, dependências, comandos).
- **API:** Documentação dos endpoints (Swagger, Postman, Insomnia ou outro formato que deixe claro como chamar cada rota).

---

## Aspectos valorizados na solução

Na implementação, serão priorizados:

- **POO** — Programação orientada a objetos
- **SOLID** — Princípios de design de software
- **DSA** — Estruturas de dados e algoritmos
- **Containerização** — Aplicação containerizada

---

Boa sorte. Qualquer dúvida sobre as regras de negócio, use o contato indicado no processo seletivo.