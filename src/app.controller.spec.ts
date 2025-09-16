import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('Health Check', () => {
    it('should return application info', () => {
      const result = appController.getAppInfo();

      expect(result).toBeDefined();
      expect(result.name).toBe('To-Do List API');
      expect(result.version).toBe('1.0.0');
      expect(result.status).toBe('running');
      expect(result.timestamp).toBeDefined();
    });

    it('should have app service defined', () => {
      expect(appService).toBeDefined();
    });

    it('should return proper API endpoints info', () => {
      const result = appController.getAppInfo();

      expect(result.endpoints).toBeDefined();
      expect(result.endpoints).toContain('/api/tasks');
      expect(result.documentation).toBe('/');
    });
  });
});
