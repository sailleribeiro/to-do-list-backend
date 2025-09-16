import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Return all tasks.' })
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body(new ValidationPipe()) createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id/done')
  @ApiOperation({ summary: 'Mark task as done' })
  @ApiResponse({
    status: 200,
    description: 'The task has been marked as done.',
  })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  markAsDone(@Param('id') id: string): Task {
    return this.tasksService.markAsDone(+id);
  }
}
