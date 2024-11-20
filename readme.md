# Clone do Twitter - API Completa

Este projeto é uma API que replica funcionalidades básicas do Twitter, incluindo autenticação, criação e interação com posts (tweets), perfis de usuários e um feed dinâmico. A aplicação foi construída com foco em boas práticas, segurança e escalabilidade.

## Funcionalidades

### Autenticação

- **Rota de Login**
  - Autentica o usuário utilizando JWT para sessões seguras.
- **Rota de Cadastro**
  - Permite o registro de novos usuários com validação de dados.

### Feed e Posts

- **Criar Tweets**
  - Permite que o usuário publique novos tweets no feed.
- **Feed Dinâmico**
  - Exibe os posts mais recentes no painel central.

### Interação com Posts

- **Botão de Like**
  - Permite que os usuários curtam posts.
- **Re-Tweet**
  - Usuários podem compartilhar posts de outros perfis.
- **Comentários**
  - Adicione comentários em qualquer tweet.

### Perfis de Usuários

- **Visualizar Perfil Próprio ou de Outros Usuários**
  - Apresenta informações detalhadas do usuário, incluindo:
    - Foto de perfil.
    - Foto de capa.

### Busca e Recomendações

- **Input de Busca**
  - Pesquise hashtags e usuários.
- **Tendências (Trending Topics)**
  - Exibe as hashtags mais populares.
- **Sugestão de Quem Seguir**
  - Recomenda usuários relevantes para seguir.

## Tecnologias e Ferramentas Utilizadas

- **Node.js**: Plataforma de execução para JavaScript no servidor.
- **Express**: Framework web para criação de rotas e middlewares.
- **Prisma**: ORM para manipulação do banco de dados.
- **JWT (JSON Web Token)**: Gerenciamento seguro de sessões de usuário.
- **Helmet**: Middleware de segurança para reforçar cabeçalhos HTTP.
- **Bcrypt**: Para hashing seguro de senhas.
- **Slug**: Geração de slugs para URLs amigáveis.
- **Zod**: Validação de dados e schemas.
- **TypeScript**: Tipagem estática para maior segurança e organização do código.

## Estrutura do Projeto

```
/src
  /controllers
  /models
  /routes
  /services
  server.ts
```

## Instalação e Configuração

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/clone-twitter.git
cd clone-twitter
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o Banco de Dados:

   - Configure o PostgreSQL e crie um banco de dados.
   - Crie o arquivo `.env` com as informações de conexão do banco.

4. Execute as migrações do Prisma:

```bash
npx prisma migrate dev
```

5. Inicie o servidor em ambiente de desenvolvimento:

```bash
npm run dev
```

## Variáveis de Ambiente

Adicione as seguintes variáveis ao arquivo `.env`:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/clone_twitter
JWT_SECRET=sua_chave_secreta
```

## Uso da API

### Autenticação

- **Login**
  - Endpoint: `POST /auth/sign-in`
  - Descrição: Autentica o usuário e retorna um token JWT.
  - Exemplo de Request:

```json
{
  "email": "usuario@exemplo.com",
  "password": "sua_senha"
}
```

- **Cadastro**
  - Endpoint: `POST /auth/signup`
  - Descrição: Registra um novo usuário.
  - Exemplo de Request:

```json
{
  "name": "Nome do Usuário",
  "email": "usuario@exemplo.com",
  "password": "sua_senha"
}
```

### Tweets

- **Criar Tweet**
  - Endpoint: `POST /tweets`
  - Descrição: Cria um novo tweet.
  - Exemplo de Request:

```json
{
  "content": "Texto do tweet"
}
```

- **Feed**
  - Endpoint: `GET /tweets`
  - Descrição: Retorna os tweets mais recentes.

## Considerações de Segurança

- **Senhas Criptografadas**: Todas as senhas são armazenadas utilizando hashing seguro (Bcrypt).
- **JWT Seguro**: Tokens JWT assinados com chave secreta.
- **Helmet**: Proteção contra vulnerabilidades comuns utilizando cabeçalhos de segurança.

## Autor

Desenvolvido por Daniel Quadros.

## Licença

Este projeto está licenciado sob a licença ISC.

## Contato

Para dúvidas ou sugestões, entre em contato:

- E-mail: danieltquadros@hotmail.com
- LinkedIn: [Daniel Quadros](https://linkedin.com/in/danieltquadros)

Contribuições são bem-vindas!
