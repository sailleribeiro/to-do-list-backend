# To-Do List API

API REST para gerenciamento de tarefas desenvolvida com NestJS, TypeScript e PostgreSQL.

## 🚀 Funcionalidades

- Listar todas as tarefas
- Criar nova tarefa
- Marcar tarefa como concluída
- Deletar tarefa
- Validação automática de dados
- Documentação interativa com Swagger
- Persistência de dados com PostgreSQL
- Migrações automáticas do banco
- Interface visual do banco de dados

## 🔧 Tecnologias

- **NestJS** - Framework Node.js
- **TypeScript** - Linguagem de programação
- **PostgreSQL** - Banco de dados relacional
- **Drizzle ORM** - ORM moderno para TypeScript
- **class-validator** - Validação de dados
- **Swagger/OpenAPI** - Documentação da API
- **Jest** - Framework de testes
- **Docker** - Containerização

## 📁 Estrutura do Projeto

```
src/
├── database/
│   └── database.module.ts    # Módulo de conexão com banco
├── tasks/
│   ├── tasks.controller.ts   # Controlador REST
│   ├── tasks.service.ts      # Lógica de negócio
│   ├── tasks.module.ts       # Módulo de tasks
│   ├── dto/                  # Data Transfer Objects
│   └── entities/             # Entidades TypeScript
db/
├── connection.ts             # Conexão com PostgreSQL
├── schema/
│   ├── index.ts              # Exportação dos schemas
│   └── tasks.ts              # Schema da tabela tasks
├── migrations/               # Migrações do banco
└── seed.ts                   # Dados iniciais
```

## 📋 Endpoints

| Método  | Rota                | Descrição                     |
|---------|---------------------|-------------------------------|
| `GET`   | `/tasks`            | Lista todas as tarefas        |
| `POST`  | `/tasks`            | Cria uma nova tarefa          |
| `PATCH` | `/tasks/:id/done`   | Marca tarefa como concluída   |
| `DELETE`| `/tasks/:id`        | Deleta uma tarefa pelo ID     |
| `GET`   | `/health`           | Verifica o status da aplicação|

## 🛠️ Como executar

### Pré-requisitos

- **Node.js** v20 ou superior
- **Docker** e **Docker Compose**
- **npm** ou **yarn**

### 1. Clonar o repositório

```bash
git clone <repository-url>
cd to-do-list-backend
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Configuração do banco de dados
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/todolist
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=todolist

# Configuração do servidor
PORT=3000
EXTERNAL_PORT=3001
```

### 3. Executar com Docker (Recomendado)

```bash
# Instalar dependências
npm install

# Subir containers (PostgreSQL + API)
docker-compose up -d

# Aguardar containers estabilizarem
docker-compose logs -f api

# Aplicar migrações do banco
docker compose exec api npx drizzle-kit push

# Executar seed (dados iniciais)
docker compose exec api npm run db:seed
```

### 4. Verificar se está funcionando

```bash
# Testar API
curl http://localhost:3001/tasks

# Acessar documentação
# http://localhost:3001/api
```

### URLs de acesso

- **API**: http://localhost:3001
- **Documentação Swagger**: http://localhost:3001/api
- **Drizzle Studio**: Execute `npm run db:studio` e acesse https://local.drizzle.studio

## 🗄️ Banco de Dados

### Comandos úteis do Drizzle

```bash
# Gerar migrações
npm run db:generate
# ou: docker compose exec api npx drizzle-kit generate

# Aplicar mudanças no banco
npm run db:push
# ou: docker compose exec api npx drizzle-kit push

# Executar migrações
npm run db:migrate
# ou: docker compose exec api npx drizzle-kit migrate

# Abrir interface visual do banco
npm run db:studio
# ou: docker compose exec api npx drizzle-kit studio

# Executar seed
npm run db:seed:docker
```

### Conectar diretamente ao PostgreSQL

```bash
# Conectar ao banco via psql
docker compose exec postgres psql -U postgres -d todolist

# Comandos úteis no psql:
# \dt                    # Listar tabelas
# SELECT * FROM tasks;   # Ver todas as tasks
# \q                     # Sair
```

### Schema da tabela `tasks`

```sql
CREATE TABLE tasks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title varchar(100) NOT NULL,
    description varchar(500),
    done boolean DEFAULT false NOT NULL,
    created_at timestamp DEFAULT now() NOT NULL,
    updated_at timestamp DEFAULT now() NOT NULL
);
```

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
# Listar tarefas
curl http://localhost:3001/tasks

# Criar tarefa
curl -X POST http://localhost:3001/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Estudar Drizzle ORM", "description": "Aprender sobre schemas e migrações"}'

# Marcar como concluída (substitua {id} pelo ID real)
curl -X PATCH http://localhost:3001/tasks/{id}/done

# Deletar tarefa (substitua {id} pelo ID real)
curl -X DELETE http://localhost:3001/tasks/{id}
```

## 🐳 Comandos Docker úteis

```bash
# Ver logs da API
docker-compose logs -f api

# Ver logs do PostgreSQL
docker-compose logs -f postgres

# Parar containers
docker-compose down

# Rebuild containers
docker-compose up --build -d

# Verificar status dos containers
docker-compose ps
```

## 📦 Scripts disponíveis

```bash
# Desenvolvimento
npm run start:dev              # Executar em modo desenvolvimento
npm run start:debug            # Executar com debug
npm run build                  # Build da aplicação

# Banco de dados
npm run db:generate            # Gerar migrações
npm run db:push               # Aplicar mudanças no banco
npm run db:migrate            # Executar migrações
npm run db:studio             # Interface visual do banco
npm run db:seed               # Executar seed
npm run db:push:docker        # Push via Docker
npm run db:seed:docker        # Seed via Docker

# Qualidade de código
npm run lint                  # Executar ESLint
npm run format               # Formatar código com Prettier
npm run test                 # Testes unitários
npm run test:e2e            # Testes E2E
npm run test:cov            # Cobertura de testes
```

## ⚠️ Observações

- **Persistência**: Dados são salvos no PostgreSQL via Docker Volume
- **Validação**: Validação automática com class-validator e Zod
- **Migrações**: Controle de versão do banco com Drizzle Kit
- **Documentação**: Swagger UI disponível em `/api`
- **Desenvolvimento**: Hot reload habilitado no modo dev
- **Produção**: Use `npm run start:prod` para produção

## 🔧 Troubleshooting

### Problemas comuns

1. **Porta em uso**: Altere `EXTERNAL_PORT` no `.env`
2. **Banco não conecta**: Verifique se containers estão rodando com `docker-compose ps`
3. **Tabela não existe**: Execute `docker compose exec api npx drizzle-kit push`
4. **Sem dados**: Execute `docker compose exec api npm run db:seed`

### Reset completo

```bash
# Parar tudo e limpar
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d

# Recriar banco
docker compose exec api npx drizzle-kit push
docker compose exec api npm run db:seed
```