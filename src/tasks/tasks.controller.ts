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
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskIdDto } from './dto/task-id.dto';
import { Task } from './entities/task.entity';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all tasks. Returns empty array if no tasks exist.',
    type: [Task],
  })
  async findAll(): Promise<Task[]> {
    return await this.tasksService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The task has been successfully created.',
    type: Task,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async create(
    @Body(new ValidationPipe()) createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return await this.tasksService.create(createTaskDto);
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
    type: Task,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Task not found.' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid UUID format.',
  })
  async markAsDone(
    @Param(new ValidationPipe()) params: TaskIdDto,
  ): Promise<Task> {
    return await this.tasksService.markAsDone(params.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The unique identifier of the task (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The task has been successfully deleted.',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Task not found.' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid UUID format.',
  })
  async delete(@Param(new ValidationPipe()) params: TaskIdDto): Promise<void> {
    return await this.tasksService.delete(params.id);
  }
}
