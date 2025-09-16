import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Configurar pipes igual ao main.ts
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    // Configurar global prefix igual ao main.ts
    app.setGlobalPrefix('api');

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/api/tasks (GET)', () => {
    it('should return empty array initially', () => {
      return request(app.getHttpServer())
        .get('/api/tasks')
        .expect(200)
        .expect([]);
    });
  });

  describe('/api/tasks (POST)', () => {
    it('should create a new task', () => {
      const createTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };

      return request(app.getHttpServer())
        .post('/api/tasks')
        .send(createTaskDto)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.title).toBe('Test Task');
          expect(res.body.description).toBe('Test Description');
          expect(res.body.done).toBe(false);
          expect(res.body).toHaveProperty('createdAt');
        });
    });

    it('should fail to create task without title', () => {
      const createTaskDto = {
        description: 'Test Description',
      };

      return request(app.getHttpServer())
        .post('/api/tasks')
        .send(createTaskDto)
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('title should not be empty');
        });
    });

    it('should fail to create task with title too long', () => {
      const createTaskDto = {
        title: 'a'.repeat(101), // Mais que 100 caracteres
        description: 'Test Description',
      };

      return request(app.getHttpServer())
        .post('/api/tasks')
        .send(createTaskDto)
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain(
            'title must be shorter than or equal to 100 characters',
          );
        });
    });
  });

  describe('/api/tasks/:id/done (PATCH)', () => {
    it('should mark task as done', async () => {
      // Primeiro criar uma task
      const createTaskDto = {
        title: 'Task to complete',
        description: 'This will be completed',
      };

      const createResponse = await request(app.getHttpServer())
        .post('/api/tasks')
        .send(createTaskDto)
        .expect(201);

      const taskId = createResponse.body.id;

      // Agora marcar como done
      return request(app.getHttpServer())
        .patch(`/api/tasks/${taskId}/done`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(taskId);
          expect(res.body.done).toBe(true);
          expect(res.body.title).toBe('Task to complete');
        });
    });

    it('should return 404 for non-existent task', () => {
      return request(app.getHttpServer())
        .patch('/api/tasks/999/done')
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toBe('Task not found');
        });
    });

    it('should return 400 for invalid task ID', () => {
      return request(app.getHttpServer())
        .patch('/api/tasks/invalid/done')
        .expect(400);
    });
  });

  describe('Integration test - Full workflow', () => {
    it('should create, list, and complete a task', async () => {
      // 1. Verificar lista vazia
      await request(app.getHttpServer())
        .get('/api/tasks')
        .expect(200)
        .expect([]);

      // 2. Criar primeira task
      const task1 = await request(app.getHttpServer())
        .post('/api/tasks')
        .send({
          title: 'First Task',
          description: 'My first task',
        })
        .expect(201);

      // 3. Criar segunda task
      const task2 = await request(app.getHttpServer())
        .post('/api/tasks')
        .send({
          title: 'Second Task',
        })
        .expect(201);

      // 4. Verificar lista com 2 tasks
      await request(app.getHttpServer())
        .get('/api/tasks')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveLength(2);
          expect(res.body[0].title).toBe('First Task');
          expect(res.body[1].title).toBe('Second Task');
        });

      // 5. Marcar primeira task como done
      await request(app.getHttpServer())
        .patch(`/api/tasks/${task1.body.id}/done`)
        .expect(200)
        .expect((res) => {
          expect(res.body.done).toBe(true);
        });

      // 6. Verificar estado final
      await request(app.getHttpServer())
        .get('/api/tasks')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveLength(2);
          expect(res.body[0].done).toBe(true);
          expect(res.body[1].done).toBe(false);
        });
    });
  });
});
