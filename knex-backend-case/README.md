# Knex Sales API

API RESTful para gerenciamento de empresas, produtos e transações de venda.

## Requisitos

- Node.js 20+
- Docker e Docker Compose

## Como rodar

**1. Instalar dependências**
```bash
npm install
```

**2. Configurar variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/knex_sales"
JWT_SECRET="sua_chave_secreta"
PORT=3000
```

**3. Subir o banco de dados**
```bash
docker compose up -d
```

**4. Rodar as migrations**
```bash
npm run migrate:deploy
```

**5. Iniciar o servidor**
```bash
# Desenvolvimento (hot reload)
npm run dev

# Produção
npm run build && npm start
```

A API estará disponível em `http://localhost:3000`.

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
