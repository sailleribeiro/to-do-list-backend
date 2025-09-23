import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { tasks } from '../../db/schema/tasks';
import type { db as DatabaseType } from '../../db/connection';

@Injectable()
export class TasksService {
  constructor(@Inject('DATABASE') private readonly db: typeof DatabaseType) {}

  async findAll(): Promise<Task[]> {
    return await this.db.select().from(tasks).orderBy(tasks.createdAt);
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const [newTask] = await this.db
      .insert(tasks)
      .values({
        title: createTaskDto.title,
        description: createTaskDto.description,
      })
      .returning();

    return newTask;
  }

  async markAsDone(id: string): Promise<Task> {
    const [updatedTask] = await this.db
      .update(tasks)
      .set({
        done: true,
        updatedAt: new Date(),
      })
      .where(eq(tasks.id, id))
      .returning();

    if (!updatedTask) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return updatedTask;
  }

  async delete(id: string): Promise<void> {
    const [deletedTask] = await this.db
      .delete(tasks)
      .where(eq(tasks.id, id))
      .returning();

    if (!deletedTask) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
