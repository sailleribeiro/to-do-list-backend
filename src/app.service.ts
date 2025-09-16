import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppInfo() {
    return {
      name: 'To-Do List API',
      version: '1.0.0',
      status: 'running',
      timestamp: new Date().toISOString(),
      endpoints: ['/api/tasks'],
      documentation: '/',
      description: 'A simple API to manage your to-do lists and tasks',
    };
  }
}
