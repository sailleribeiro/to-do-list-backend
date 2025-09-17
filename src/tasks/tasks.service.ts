import { Injectable, NotFoundException } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks = new Map<number, Task>();
  private nextId = 1;

  findAll(): Task[] {
    return Array.from(this.tasks.values());
  }

  create(createTaskDto: CreateTaskDto): Task {
    const task = new Task(
      this.nextId++,
      createTaskDto.title,
      createTaskDto.description,
    );
    this.tasks.set(task.id, task);
    return task;
  }

  markAsDone(id: number): Task {
    const task = this.tasks.get(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.done = true;
    return task;
  }

  @Throttle({ default: { limit: 10, ttl: 60000 } }) // 10 requests por minuto
  findById(id: number): Task {
    const task = this.tasks.get(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }
}
