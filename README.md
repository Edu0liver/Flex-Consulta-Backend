# Flex Consulta Backend Challenge

## Descrição
Este é um desafio para testar suas habilidades de desenvolvimento de software. O desafio consiste em criar uma API RESTful que simula um sistema de gerenciamento de produtos, com criação e autorização de usuários.

## Requisitos
- O sistema deve ser capaz de criar um usuário com nome, email e senha.
- O sistema deve ser capaz de autenticar um usuário com email e senha.
- O sistema deve ser capaz de criar um produto com nome, descrição e preço.
- O sistema deve ser capaz de listar todos os produtos.
- O sistema deve ser capaz de listar produtos específicos.
- O sistema deve ser capaz de atualizar um produto.
- O sistema deve ser capaz de deletar um produto.

## Regras
- O usuário deve estar autenticado para criar, listar, atualizar ou deletar um produto.
- O usuário só pode utilizar o sistema de gerenciamento de produtos se ele estiver autenticado.

## Tecnologias
- Node.js
- Express
- Postgres
- Prisma
- JWT

## Processos de Instalação
Há duas maneiras de rodar a aplicação, utilizando o Docker ou rodando localmente.

### Docker
Utilizando Docker temos a oportunidade de rodar a aplicação usando Redis, com o Docker Compose.
Porem, também temos a possibilidade de rodar a aplicação sem o Redis, utilizando o Dockerfile.

#### Dockerfile
Após executar o comando abaixo, a aplicação estará rodando na porta 8080.
```docker
docker build -t flex-consulta-backend-challenge .
docker run -d -p 8080:8080 --name flextest flex-consulta-backend-challenge
```

#### Docker Compose
Para que seja possível rodar a aplicação com o Redis, é necessário fazer uma alteração no .env, alterando o valor de REDIS_ENABLED=true.
Após executar o comando abaixo, a aplicação estará rodando na porta 8080, e o Redis na porta 6379.
```docker
docker-compose up -d
```

### Local
Para rodar a aplicação localmente, é necessário ter o Node.js instalado, de preferência na versão 20.9.0

#### Instalando as dependências
```bash
npm install
```

#### Configurando o banco de dados
Para garantir uma sincronização correta com o banco de dados, é necessário rodar o comando abaixo.
```bash
npx prisma generate
npx prisma db push --accept-data-loss
```

#### Buildando a aplicação
```bash
npm run build
```

#### Rodando a aplicação
```bash
npm run start
```

## Testes
Para rodar os testes, é necessário rodar o comando abaixo.
```bash
npm run test
```

## Endpoints
### Usuários
- POST /users
- POST /users/login

### Produtos
- GET /products
- POST /products
- POST /products/image/:id
- PUT /products/:id
- DELETE /products/:id

## Autor
- [Eduardo Oliveira Alves](https://www.linkedin.com/in/eduoliveiralves/)
