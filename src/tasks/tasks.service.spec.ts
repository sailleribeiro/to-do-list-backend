import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', () => {
    const createTaskDto: CreateTaskDto = {
      title: 'Test Task',
      description: 'Test Description',
    };

    const task = service.create(createTaskDto);

    expect(task).toBeDefined();
    expect(task.id).toEqual(expect.any(String));
    expect(task.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    ); // Valida formato UUID
    expect(task.title).toBe('Test Task');
    expect(task.description).toBe('Test Description');
    expect(task.done).toBe(false);
    expect(task.createdAt).toBeInstanceOf(Date);
  });

  it('should return all tasks', () => {
    const createTaskDto: CreateTaskDto = {
      title: 'Test Task',
    };

    service.create(createTaskDto);
    const tasks = service.findAll();

    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe('Test Task');
  });

  it('should mark task as done', () => {
    const createTaskDto: CreateTaskDto = {
      title: 'Test Task',
    };

    const task = service.create(createTaskDto);
    const updatedTask = service.markAsDone(task.id);

    expect(updatedTask.done).toBe(true);
  });

  it('should throw NotFoundException when marking non-existent task as done', () => {
    expect(() =>
      service.markAsDone('550e8400-e29b-41d4-a716-446655440000'),
    ).toThrow(NotFoundException);
  });
});
