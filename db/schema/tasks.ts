import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';

export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 100 }).notNull(),
  description: varchar('description', { length: 500 }),
  done: boolean('done').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;
