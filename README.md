# README.md
# To-Do List API

Uma API simples para gerenciar tarefas com NestJS, TypeScript e armazenamento em memória.

## 🚀 Funcionalidades

- ✅ Listar todas as tarefas
- ✅ Criar nova tarefa
- ✅ Marcar tarefa como concluída
- ✅ Validação de dados com DTOs
- ✅ Documentação automática com Swagger
- ✅ Testes unitários
- ✅ Docker support

## 📋 Endpoints

- `GET /tasks` - Retorna todas as tarefas
- `POST /tasks` - Cria uma nova tarefa
- `PATCH /tasks/:id/done` - Marca tarefa como concluída

## 🛠️ Como executar

### Opção 1: Desenvolvimento local

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run start:dev

# API estará disponível em http://localhost:3000
# Documentação Swagger: http://localhost:3000/api
```

### Opção 2: Docker

```bash
# Executar com Docker Compose
docker-compose up

# API estará disponível em http://localhost:3000
```

### Opção 3: Docker simples

```bash
# Build da imagem
docker build -t todo-api .

# Executar container
docker run -p 3000:3000 todo-api
```

## 🧪 Executar testes

```bash
# Testes unitários
npm run test

# Testes com coverage
npm run test:cov

# Testes em modo watch
npm run test:watch
```

## 📝 Exemplo de uso

```bash
# Criar uma tarefa
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Estudar NestJS", "description": "Aprender sobre DTOs e validação"}'

# Listar todas as tarefas
curl http://localhost:3000/tasks

# Marcar tarefa como concluída
curl -X PATCH http://localhost:3000/tasks/1/done
```

## 🏗️ Estrutura do projeto

```
src/
├── tasks/
│   ├── dto/
│   │   └── create-task.dto.ts
│   ├── entities/
│   │   └── task.entity.ts
│   ├── tasks.controller.ts
│   ├── tasks.service.ts
│   ├── tasks.service.spec.ts
│   └── tasks.module.ts
├── app.module.ts
└── main.ts
```

## 🔧 Tecnologias utilizadas

- NestJS
- TypeScript
- class-validator
- Swagger/OpenAPI
- Jest (testes)
- Docker

## ⚠️ Observações

- Os dados são armazenados em memória (array)
- Os dados são perdidos quando a aplicação é reiniciada
- Ideal para desenvolvimento e testes