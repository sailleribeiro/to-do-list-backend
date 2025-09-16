# To-Do List API

API REST para gerenciamento de tarefas desenvolvida com NestJS e TypeScript.

## 🚀 Funcionalidades

- Listar todas as tarefas
- Criar nova tarefa
- Marcar tarefa como concluída
- Validação automática de dados
- Documentação interativa com Swagger
- Testes unitários e E2E

## 🔧 Tecnologias

- **NestJS** - Framework Node.js
- **TypeScript** - Linguagem de programação
- **class-validator** - Validação de dados
- **Swagger/OpenAPI** - Documentação da API
- **Jest** - Framework de testes
- **Docker** - Containerização

## 📋 Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/tasks` | Lista todas as tarefas |
| `POST` | `/api/tasks` | Cria uma nova tarefa |
| `PATCH` | `/api/tasks/:id/done` | Marca tarefa como concluída |

## 🛠️ Como executar

### Desenvolvimento local

```bash
# Instalar dependências
npm install

# Executar aplicação
npm run start:dev
```

### Docker

```bash
# Executar com Docker Compose
docker-compose up -d
```

### URLs de acesso

- **API**: http://localhost:3001
- **Documentação**: http://localhost:3001 (Swagger UI)
- **Endpoints**: http://localhost:3001/api/tasks

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes E2E
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## 📝 Exemplo de uso

```bash
# Criar tarefa
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Estudar NestJS", "description": "Aprender sobre DTOs"}'

# Listar tarefas
curl http://localhost:3001/api/tasks

# Marcar como concluída
curl -X PATCH http://localhost:3001/api/tasks/1/done
```

## ⚠️ Observações

- Dados armazenados em memória (perdidos ao reiniciar)
- Validação automática nos dados de entrada
- Documentação interativa