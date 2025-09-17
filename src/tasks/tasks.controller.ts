import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  ValidationPipe,
  HttpStatus,
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
  findAll(): Task[] {
    return this.tasksService.findAll();
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

  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The unique identifier of the task (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: true,
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the task.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Task not found.' })
  findById(@Param('id') id: string): Task {
    return this.tasksService.findById(id);
  }
}
