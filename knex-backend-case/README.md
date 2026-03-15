# Knex Sales API

API RESTful para gerenciamento de empresas, produtos e transações de venda.

## Requisitos

- Docker e Docker Compose

## Como rodar

```bash
docker compose up --build
```

A API estará disponível em `http://localhost:3000`.

> O banco de dados é criado e as migrations são aplicadas automaticamente.

## Documentação

As decisões de arquitetura, modelagem de domínio e convenções REST estão documentadas em [`docs/architecture.md`](docs/architecture.md).

## Testando com Insomnia

Importe o arquivo `insomnia_collection.yaml` no Insomnia. O endpoint de login já salva o token automaticamente no ambiente.

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/health` | Health check |
| POST | `/api/auth/register` | Cadastrar usuário |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/profile` | Perfil do usuário autenticado |
| POST | `/api/companies` | Criar empresa |
| GET | `/api/companies` | Listar empresas |
| GET | `/api/companies/:id` | Detalhes da empresa |
| DELETE | `/api/companies/:id` | Deletar empresa |
| POST | `/api/companies/:id/join` | Entrar em uma empresa |
| POST | `/api/companies/:id/leave` | Sair de uma empresa |
| GET | `/api/companies/:id/members` | Listar membros |
| GET | `/api/companies/:id/transactions` | Transações da empresa |
| POST | `/api/companies/:id/products` | Criar produto |
| GET | `/api/products` | Listar produtos |
| GET | `/api/products/:id` | Detalhes do produto |
| PUT | `/api/products/:id` | Atualizar produto |
| DELETE | `/api/products/:id` | Deletar produto |
| POST | `/api/transactions` | Realizar compra |
| GET | `/api/transactions` | Listar minhas compras |
