import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ValidationPipe,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all tasks.' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'No tasks found.',
  })
  findAll(): Task[] {
    const tasks = this.tasksService.findAll();
    if (tasks.length === 0) {
      throw new HttpException('No tasks found', HttpStatus.NO_CONTENT);
    }
    return tasks;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The task has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  create(@Body(new ValidationPipe()) createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id/done')
  @ApiOperation({ summary: 'Mark task as done' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The unique identifier of the task (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The task has been marked as done.',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Task not found.' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid task ID format.',
  })
  markAsDone(@Param('id') id: string): Task {
    return this.tasksService.markAsDone(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The unique identifier of the task (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The task has been successfully deleted.',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Task not found.' })
  delete(@Param('id') id: string): void {
    this.tasksService.delete(id);
  }
}
