import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'insert the title of the task',
    example: 'Task frontend',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @ApiPropertyOptional({
    description: 'insert the description of the task',
    example: 'Integrate routes in the frontend',
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;
}
