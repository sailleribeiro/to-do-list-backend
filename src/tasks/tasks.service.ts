import { Injectable, NotFoundException } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { v4 as uuidv4 } from 'uuid';

import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private readonly tasks: Map<string, Task> = new Map<string, Task>();

  findAll(): Task[] {
    return Array.from(this.tasks.values()).reverse();
  }

  create(createTaskDto: CreateTaskDto): Task {
    const taskId = uuidv4();

    const task = new Task(
      taskId,
      createTaskDto.title,
      createTaskDto.description,
    );
    this.tasks.set(task.id, task);
    return task;
  }

  markAsDone(id: string): Task {
    const task = this.tasks.get(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.done = true;
    return task;
  }

  delete(id: string): void {
    const task = this.tasks.get(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    this.tasks.delete(id);
  }
}
