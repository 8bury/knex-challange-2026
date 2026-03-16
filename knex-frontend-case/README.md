# Cup&Cake — Frontend

Site vitrine de uma loja de cupcakes com painel de gerenciamento de produtos. Desenvolvido com **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **React Hook Form** e **Zod**.

## 🚀 Produção

| | URL |
|---|---|
| **Site** | https://cupandcake.pedrosales.dev |

**Deploy:** [Vercel](https://vercel.com/).

---

## Funcionalidades

- Pagina de **registro** e **login** com validação em tempo real
- Token de autenticação armazenado em **Cookies** para persistência de sessão
- Rotas protegidas via **Next.js Middleware**
- **Landing page** da loja exibindo produtos e depoimentos (visivel apenas para usuarios logados)
- **CRUD completo de produtos**: criar (com upload de imagem), listar, excluir

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm v9 ou superior

## Como rodar

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd knex-frontend-case
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente (opcional)

Por padrão, a aplicação aponta para a API em produção (`https://knex.zernis.space`). Para usar uma API local, crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Scripts disponíveis

| Comando          | Descrição                              |
| ---------------- | -------------------------------------- |
| `npm run dev`    | Inicia o servidor de desenvolvimento   |
| `npm run build`  | Gera o build de produção               |
| `npm run start`  | Inicia o servidor em modo producao     |
| `npm run lint`   | Verifica o código com ESLint           |
| `npm run format` | Formata o código com Prettier          |

## Fluxo de uso

1. Acesse `/register` para criar uma conta.
2. Faça login em `/login` — o token é salvo automaticamente em um cookie.
3. Na pagina principal, visualize os produtos da sua loja.
4. Clique em **+** na secao de produtos para adicionar um novo item (nome, descricao, preco e foto).
5. Clique em **-** em um card de produto para remove-lo.
6. Use o botao de logout no cabecalho para encerrar a sessao.

## Tecnologias

- [Next.js 16](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Axios](https://axios-http.com/)
- [js-cookie](https://github.com/js-cookie/js-cookie)
