import { ApiProperty } from '@nestjs/swagger';

export class Task {
  @ApiProperty({
    description: 'Unique identifier of the task',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: 'string',
  })
  id: string;

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
    nullable: true,
  })
  description: string | null;

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

  @ApiProperty({
    description: 'When the task was last updated',
    example: '2024-01-01T10:00:00.000Z',
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;

  constructor(id: string, title: string, description: string | null) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.done = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
