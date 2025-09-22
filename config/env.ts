export const env = {
  DATABASE_URL: process.env.DATABASE_URL!,
  PORT: process.env.PORT || '3000',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || '5432',
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
  DB_NAME: process.env.DB_NAME || 'todolist',
};
