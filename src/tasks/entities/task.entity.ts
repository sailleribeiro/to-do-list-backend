import { ApiProperty } from '@nestjs/swagger';

export class Task {
  @ApiProperty({
    description: 'Unique identifier of the task',
    example: 1,
    type: 'integer',
  })
  id: number;

  @ApiProperty({
    description: 'Title of the task',
    example: 'Create a to-do list API',
    maxLength: 100,
  })
  title: string;

  @ApiProperty({
    description: 'Optional description of the task',
    example: 'Implement authentication',
    required: false,
    maxLength: 500,
  })
  description?: string;

  @ApiProperty({
    description: 'Whether the task is completed',
    example: false,
    default: false,
  })
  done: boolean;

  @ApiProperty({
    description: 'When the task was created',
    example: '2024-01-01T10:00:00.000Z',
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;

  constructor(id: number, title: string, description?: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.done = false;
    this.createdAt = new Date();
  }
}
