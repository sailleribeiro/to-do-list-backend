import { Controller, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Application health information',
    example: {
      name: 'To-Do List API',
      version: '1.0.0',
      status: 'running',
      timestamp: '2024-01-01T10:00:00.000Z',
      endpoints: ['/api/tasks'],
      documentation: '/',
    },
  })
  getAppInfo() {
    return this.appService.getAppInfo();
  }

  @Get('version')
  @ApiExcludeEndpoint()
  getVersion() {
    return { version: '1.0.0' };
  }
}
