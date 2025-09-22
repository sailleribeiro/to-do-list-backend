import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

const mockDb = {
  select: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockResolvedValue([]),
  insert: jest.fn().mockReturnThis(),
  values: jest.fn().mockReturnThis(),
  returning: jest.fn(),
  update: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let taskCounter = 0;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('DATABASE')
      .useValue(mockDb)
      .compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    await app.init();

    jest.clearAllMocks();
    taskCounter = 0;

    setupMockResponses();
  });

  function setupMockResponses() {
    const tasks: any[] = [];

    mockDb.orderBy.mockImplementation(() => Promise.resolve([...tasks]));

    mockDb.returning.mockImplementation(() => {
      const newTask = {
        id: `task-${++taskCounter}`,
        title: 'Test Task',
        description: 'Test Description',
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      tasks.push(newTask);
      return Promise.resolve([newTask]);
    });
  }

  afterEach(async () => {
    await app.close();
  });

  describe('Health endpoints', () => {
    it('/health (GET)', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('name', 'To-Do List API');
          expect(res.body).toHaveProperty('version', '1.0.0');
          expect(res.body).toHaveProperty('status', 'running');
          expect(res.body).toHaveProperty('timestamp');
          expect(res.body).toHaveProperty('endpoints');
          expect(res.body).toHaveProperty('documentation');
          expect(res.body).toHaveProperty('description');
        });
    });

    it('/version (GET)', () => {
      return request(app.getHttpServer())
        .get('/version')
        .expect(200)
        .expect({ version: '1.0.0' });
    });
  });

  describe('/tasks (GET)', () => {
    it('should return empty array initially', () => {
      return request(app.getHttpServer()).get('/tasks').expect(200).expect([]);
    });
  });

  describe('/tasks (POST)', () => {
    it('should create a new task', () => {
      const createTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };

      mockDb.returning.mockResolvedValueOnce([
        {
          id: 'test-id',
          title: 'Test Task',
          description: 'Test Description',
          done: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);

      return request(app.getHttpServer())
        .post('/tasks')
        .send(createTaskDto)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.title).toBe('Test Task');
          expect(res.body.description).toBe('Test Description');
          expect(res.body.done).toBe(false);
        });
    });

    it('should fail to create task without title', () => {
      const createTaskDto = {
        description: 'Test Description',
      };

      return request(app.getHttpServer())
        .post('/tasks')
        .send(createTaskDto)
        .expect(400);
    });
  });

  describe('/tasks/:id/done (PATCH)', () => {
    it('should mark task as done', () => {
      const taskId = '550e8400-e29b-41d4-a716-446655440000';

      mockDb.returning.mockResolvedValueOnce([
        {
          id: taskId,
          title: 'Task to complete',
          description: 'This will be completed',
          done: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);

      return request(app.getHttpServer())
        .patch(`/tasks/${taskId}/done`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(taskId);
          expect(res.body.done).toBe(true);
        });
    });

    it('should return 404 for non-existent task', () => {
      const nonExistentId = '550e8400-e29b-41d4-a716-446655440001';

      mockDb.returning.mockResolvedValueOnce([]);

      return request(app.getHttpServer())
        .patch(`/tasks/${nonExistentId}/done`)
        .expect(404);
    });

    it('should return 400 for invalid UUID', () => {
      return request(app.getHttpServer())
        .patch('/tasks/invalid-uuid/done')
        .expect(400);
    });
  });

  describe('/tasks/:id (DELETE)', () => {
    it('should delete a task by ID', () => {
      const taskId = '550e8400-e29b-41d4-a716-446655440000';

      mockDb.returning.mockResolvedValueOnce([
        {
          id: taskId,
          title: 'Task to delete',
          description: 'This task will be deleted',
          done: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);

      return request(app.getHttpServer())
        .delete(`/tasks/${taskId}`)
        .expect(204);
    });

    it('should return 404 for non-existent task', () => {
      const nonExistentId = '550e8400-e29b-41d4-a716-446655440001';

      mockDb.returning.mockResolvedValueOnce([]);

      return request(app.getHttpServer())
        .delete(`/tasks/${nonExistentId}`)
        .expect(404);
    });

    it('should return 400 for invalid UUID', () => {
      return request(app.getHttpServer())
        .delete('/tasks/invalid-uuid')
        .expect(400);
    });
  });
});
