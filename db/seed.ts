import 'dotenv/config';
import { reset, seed } from 'drizzle-seed';
import { db } from './connection';
import { schema } from './schema/index';

async function main() {
  // Apenas execute em desenvolvimento
  if (process.env.NODE_ENV === 'production') {
    console.log('Seed não deve ser executado em produção!');
    process.exit(1);
  }

  console.log('🌱 Iniciando seed do banco de dados...');

  // Reset do banco (limpa todas as tabelas)
  await reset(db, schema);
  console.log('🗑️  Banco resetado');

  // Criar dados de exemplo
  await seed(db, schema).refine((f) => {
    return {
      tasks: {
        count: 8,
        columns: {
          title: f.jobTitle(),
          description: f.loremIpsum(),
          done: f.boolean(), // Agora usa 'done'
        },
      },
    };
  });

  console.log('✅ Seed executado com sucesso!');
  process.exit(0);
}

main().catch((error) => {
  console.error('❌ Erro ao executar seed:', error);
  process.exit(1);
});
