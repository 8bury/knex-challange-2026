# API — Desafio Frontend

API REST para um pequeno sistema de loja/produtos. Este documento descreve as rotas, os relacionamentos entre entidades e o payload esperado em cada endpoint para que um frontend possa consumir a API.

**URL base:** `http://localhost:3000` (ou a URL do seu deploy)

**Autenticação:** Após o login, envie o JWT no header `Authorization` (token puro) nas rotas protegidas.

---

## Relacionamentos entre entidades

```
User (1) ←→ (1) Store
  │                  │
  │                  └── (1) Product (muitos)  ←→ (1) File
  │
  └── Um usuário tem uma loja; uma loja tem muitos produtos.
      Cada produto tem uma imagem (File).
```

- **User** — Conta (nome, email, senha). Tem exatamente uma **Store**.
- **Store** — Criada no cadastro. Tem muitos **Products**.
- **Product** — Pertence a uma Store e a um **File** (imagem). Campos: name, description, price, index (opcional, para ordenação).
- **File** — Imagem enviada. Armazenada por UUID; o arquivo é servido em `GET /<file.path>` (ex.: `/<uuid>_arquivo.jpg`).

---

## Visão geral das rotas

| Método | Caminho | Auth | Descrição |
|--------|---------|------|-----------|
| POST | `/auth/register` | Não | Cadastrar usuário e criar loja |
| POST | `/auth/login` | Não | Login e obter JWT |
| POST | `/files` | Não | Enviar imagem, obter `file_id` |
| GET | `/<filename>` | Não | Servir arquivo enviado (estático) |
| GET | `/products` | Sim | Listar produtos da loja do usuário logado |
| POST | `/products` | Sim | Criar produto (exige `file_id` de `/files`) |
| PUT | `/products/:product_id` | Sim | Atualizar produto |
| DELETE | `/products/:product_id` | Sim | Excluir produto |

---

## Auth

### POST `/auth/register`

Cria um usuário e uma loja vinculada a esse usuário.

**Requisição**

- **Content-Type:** `application/json`
- **Body:**

| Campo      | Tipo   | Obrigatório | Descrição      |
|------------|--------|-------------|----------------|
| `name`    | string | Sim        | Nome do usuário |
| `email`   | string | Sim        | Email válido   |
| `password`| string | Sim        | Senha          |

**Exemplo**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "secret123"
}
```

**Resposta**

- **201**
  - `message`: `"User and store registered successfully"` (Usuário e loja cadastrados com sucesso)

---

### POST `/auth/login`

Retorna um JWT para as credenciais informadas. Use esse token no header `Authorization` nas rotas de `/products`.

**Requisição**

- **Content-Type:** `application/json`
- **Body:**

| Campo      | Tipo   | Obrigatório | Descrição |
|------------|--------|-------------|-----------|
| `email`   | string | Sim        | Email do usuário |
| `password`| string | Sim        | Senha     |

**Exemplo**

```json
{
  "email": "jane@example.com",
  "password": "secret123"
}
```

**Resposta**

- **200**
  - `message`: `"Login successful"` (Login realizado com sucesso)
  - `token`: string JWT → envie como `Authorization: <token>` nas rotas protegidas
- **401**
  - `message`: `"Failed to login. Invalid email or password."` (Falha no login. Email ou senha inválidos.)

---

## Files

### POST `/files`

Envia uma imagem e retorna o registro do arquivo. Use o `file.id` (UUID) retornado ao criar um produto.

**Requisição**

- **Content-Type:** `multipart/form-data`
- **Body (form):**

| Campo  | Tipo  | Obrigatório | Descrição   |
|--------|-------|-------------|-------------|
| `file` | file  | Sim         | Arquivo de imagem |

**Resposta**

- **201**
  - `message`: `"File created successfully"` (Arquivo criado com sucesso)
  - `file`: `{ id, name, path, created_at, updated_at, deleted_at }`
    - `id`: string UUID → use como `file_id` em `POST /products`
    - `path`: nome do arquivo usado para servir a imagem (ex.: `uuid_nomeoriginal.jpg`)
- **400**
  - `message`: `"File is required"` (quando nenhum arquivo é enviado)

**Servindo a imagem**

- O arquivo é servido em: `GET /<file.path>` (ex.: `http://localhost:3000/abc-123_foto.jpg`).

---

## Products

Todas as rotas de produtos exigem o JWT de login no header **Authorization**.

### GET `/products`

Retorna todos os produtos da loja do usuário logado (com as relações store e file).

**Requisição**

- **Headers:** `Authorization: <token>`
- Sem body.

**Resposta**

- **200**
  - `products`: array com:
    - `id`, `name`, `description`, `price`, `index`, `created_at`, `updated_at`, `deleted_at`
    - `store`: `{ id, name, description, ... }`
    - `file`: `{ id, name, path, ... }` → URL da imagem = `GET /<file.path>`
- **401** se o token estiver ausente ou inválido.

---

### POST `/products`

Cria um produto para a loja do usuário logado. A imagem deve ser enviada antes via `POST /files`; use o `file.id` retornado como `file_id`.

**Requisição**

- **Headers:** `Authorization: <token>`, `Content-Type: application/json`
- **Body:**

| Campo         | Tipo   | Obrigatório | Descrição                          |
|---------------|--------|-------------|------------------------------------|
| `name`        | string | Sim        | Nome do produto                    |
| `description` | string | Sim        | Descrição do produto               |
| `price`       | number | Sim        | Preço                              |
| `file_id`     | string | Sim        | UUID da resposta de `POST /files`  |

**Exemplo**

```json
{
  "name": "Blue widget",
  "description": "A nice widget",
  "price": 19.99,
  "file_id": "eb3701ca-ff34-4fcd-8226-c1394ed5fae1"
}
```

**Resposta**

- **201**
  - `message`: `"Product created successfully"` (Produto criado com sucesso)
  - `product`: produto criado (id, name, description, price, store, file, timestamps)
- **404**
  - `message`: `"Store not found"` ou `"File not found"` (Loja ou arquivo não encontrado)
- **401** se o token estiver ausente ou inválido.

---

### PUT `/products/:product_id`

Atualiza um produto. Apenas o dono (usuário dono da loja do produto) pode atualizar.

**Requisição**

- **Headers:** `Authorization: <token>`, `Content-Type: application/json`
- **URL:** `product_id` = id do produto (número) no path.
- **Body:** todos os campos são opcionais; apenas os enviados são atualizados.

| Campo          | Tipo   | Obrigatório | Descrição                    |
|----------------|--------|-------------|------------------------------|
| `name`         | string | Não        | Nome do produto              |
| `description`  | string | Não        | Descrição do produto         |
| `price`        | number | Não        | Preço                        |
| `index`        | number | Não        | Índice/ordem do produto (pode ser null) |

**Exemplo**

```http
PUT /products/1
Content-Type: application/json
Authorization: <token>

{
  "name": "Updated name",
  "description": "Updated description",
  "price": 24.99,
  "index": 2
}
```

**Resposta**

- **200**
  - `message`: `"Product updated successfully"` (Produto atualizado com sucesso)
  - `product`: resultado da atualização
- **403**
  - `message`: `"You are not the owner of this product"` (Você não é o dono deste produto)
- **404**
  - `message`: `"Product not found"` (Produto não encontrado)
- **401** se o token estiver ausente ou inválido.

---

### DELETE `/products/:product_id`

Exclui um produto. Apenas o dono pode excluir.

**Requisição**

- **Headers:** `Authorization: <token>`
- **URL:** `product_id` = id do produto (número) no path.
- Sem body.

**Exemplo**

```http
DELETE /products/1
Authorization: <token>
```

**Resposta**

- **200**
  - `message`: `"Product deleted successfully"` (Produto excluído com sucesso)
- **403**
  - `message`: `"You are not the owner of this product"` (Você não é o dono deste produto)
- **404**
  - `message`: `"Product not found"` (Produto não encontrado)
- **401** se o token estiver ausente ou inválido.

---

## Fluxo típico no frontend

1. **Cadastro** → `POST /auth/register` com name, email, password.
2. **Login** → `POST /auth/login` com email, password → guardar o `token`.
3. **Enviar imagem** → `POST /files` com o campo de formulário `file` (imagem) → guardar o `file.id`.
4. **Criar produto** → `POST /products` com `Authorization: <token>` e body `{ name, description, price, file_id }`.
5. **Listar produtos** → `GET /products` com `Authorization: <token>`.
6. **Exibir imagem** → usar o `file.path` do produto: `<img src="{baseUrl}/{file.path}" />`.
7. **Atualizar produto** → `PUT /products/:product_id` com body `{ name, description, price, index }` (todos opcionais).
8. **Excluir produto** → `DELETE /products/:product_id`.

---

## Erros de validação

Se o servidor validar o body (ex.: com Celebrate/Joi), payloads inválidos retornam **400** com um payload de erro de validação. Garanta que os tipos estejam corretos (ex.: `price` como número, `file_id` como string UUID, `email` válido).
# knex-challange-2026
