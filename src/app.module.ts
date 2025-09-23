import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, TasksModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
