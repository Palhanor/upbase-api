# Desafio UpBase API

Esta é uma API desenvolvida para o desafio backend da empresa UpBase. A ideia é utilizar a tecnologia NodeJS para criar um sistema de cadastro de alunos e professores em uma plataforma chamada UpBase Portal, integrando tecnologias backend (Node.js, TypeScript, Express, Prisma, Zod) com poersistência via banco de dados MySQL.

## Sumário
1. [Tecnologias Utilizadas](#tecnologias-utilizadas)
2. [Configuração](#configuração)
3. [Endpoints](#endpoints)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Regras de Negócio](#regras-de-negócio)

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Prisma
- Zod
- Bcrypt
- Swagger
- MySQL
- CORS

## Configuração
1. **Instalação de Dependências:**
   ```bash
   npm install
   ```
2. Configurações do banco de dados MySQL no arquivo `.env` pela variável de ambiente `DATABASE_URL`.
3. Execução do projeto `npm run dev`

## Endpoints
### POST /v1/api/users

**Requisição (Payload)**
```typescript
{
    name: string;
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    student: boolean;
    teacher: boolean;
}
```
**Resposta (201)**
```typescript
{
    id: number;
    name: string;
    username: string;
    email: string;
    student: boolean;
    teacher: boolean;
    createdAt: Date;
}
```
**Resposta (400)**
```typescript
{
    error: string;
}
```
**Resposta (500)**
```typescript
{
    error: string;
}
```

### GET /v1/api/users

**Resposta (200)**
```typescript
{
    name: string;
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    student: boolean;
    teacher: boolean;
}[]
```

## Estrutura do Projeto
```bash
│   index.ts
│   swagger.json
│
├───controller
│       UserController.ts
│
├───dto
│       RequestUserDTO.ts
│
├───entity
│       User.ts
│
├───repository
│       UserRepository.ts
│
└───service
        UserService.ts
```

## Regras de negócio
- O nome do usuário deve ter no mínimo 2 caracteres e no máximo 127 caracteres.
- O nome de usuário deve ter no mínimo 3 caracteres e no máximo 127 caracteres.
- O nome de usuário pode conter apenas caracteres, dígitos e underline
- O e-mail informado deve estar em um formato válido.
- A senha deve ter no mínimo 8 caracteres e no máximo 63 caracteres.
- A senha e a confirmação de senha devem coincidir.
- A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula e um dígito numérico.
- O novo usuário deve ser um estudante ou um professor (não os dois ou nenhum).
- O nome de usuário e o e-mail devem ser únicos no sistema.