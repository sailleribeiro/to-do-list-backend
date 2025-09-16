import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private nextId = 1;

  findAll(): Task[] {
    return this.tasks;
  }

  create(createTaskDto: CreateTaskDto): Task {
    const task = new Task(
      this.nextId++,
      createTaskDto.title,
      createTaskDto.description,
    );
    this.tasks.push(task);
    return task;
  }

  markAsDone(id: number): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.done = true;
    return task;
  }

  findById(id: number): Task {
    return this.tasks.find((task) => task.id === id) as Task;
  }
}
