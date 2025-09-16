import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'titulo da tarefa',
    example: 'Task frontend',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @ApiPropertyOptional({
    description: 'A descrição da tarefa',
    example: 'Intergrar rotas no frontend',
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;
}
