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

| Método | Rota          | Descrição                     |
|--------|---------------|-------------------------------|
| `GET`  | `/api/tasks`  | Lista todas as tarefas        |
| `POST` | `/api/tasks`  | Cria uma nova tarefa          |
| `PATCH`| `/api/tasks/:id/done` | Marca tarefa como concluída |
| `GET`  | `/health`     | Verifica o status da aplicação |

## 🛠️ Como executar

### Desenvolvimento local

```bash
# Instalar dependências
npm install

# Executar aplicação
npm run start:dev
```

> **Nota:** Por padrão, a aplicação será executada na porta `3000`. Caso essa porta não esteja disponível, será utilizada a próxima porta livre. Você pode configurar uma porta específica definindo a variável de ambiente `PORT` antes de iniciar a aplicação:

```bash
# Exemplo: executar na porta 4000
set PORT=4000 && npm run start:dev
```

### Docker

```bash
# Executar com Docker Compose
docker-compose up -d
```

### URLs de acesso

- **API**: http://localhost:3000 (ou a porta configurada)
- **Documentação**: http://localhost:3000 (Swagger UI)

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
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Estudar NestJS", "description": "Aprender sobre DTOs"}'

# Listar tarefas
curl http://localhost:3000/api/tasks

# Marcar como concluída
curl -X PATCH http://localhost:3000/api/tasks/1/done
```

## ⚠️ Observações

- Dados armazenados em memória (perdidos ao reiniciar)
- Validação automática nos dados de entrada
- Documentação interativa
- Porta padrão: `3000` (configurável via variável de ambiente `PORT`)