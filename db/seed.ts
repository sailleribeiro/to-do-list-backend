import 'dotenv/config';
import { db } from './connection';
import { tasks } from './schema/tasks';

async function main() {
  console.log('🌱 Iniciando seed...');

  // Limpar dados existentes
  await db.delete(tasks);

  // Inserir dados manualmente
  const sampleTasks = [
    {
      title: 'Configurar Drizzle ORM',
      description: 'Implementar Drizzle com PostgreSQL',
      done: false,
    },
    {
      title: 'Criar API REST',
      description: 'Desenvolver endpoints CRUD',
      done: true,
    },
    {
      title: 'Documentar API',
      description: 'Adicionar Swagger documentation',
      done: false,
    },
  ];

  await db.insert(tasks).values(sampleTasks);

  console.log('✅ Seed executado com sucesso!');
  process.exit(0);
}

main().catch((error) => {
  console.error('❌ Erro:', error);
  process.exit(1);
});
