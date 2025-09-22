import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

// Mock do Drizzle DB
const mockDb = {
  select: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockResolvedValue([]),
  insert: jest.fn().mockReturnThis(),
  values: jest.fn().mockReturnThis(),
  returning: jest.fn().mockResolvedValue([
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      title: 'Test Task',
      description: 'Test Description',
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  update: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
};

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: 'DATABASE',
          useValue: mockDb,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);

    // Reset mocks
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all tasks', async () => {
      const mockTasks = [
        {
          id: '1',
          title: 'Task 1',
          description: 'Description 1',
          done: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockDb.orderBy.mockResolvedValue(mockTasks);

      const result = await service.findAll();

      expect(mockDb.select).toHaveBeenCalled();
      expect(result).toEqual(mockTasks);
    });
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };

      const mockTask = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        title: 'Test Task',
        description: 'Test Description',
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockDb.returning.mockResolvedValue([mockTask]);

      const result = await service.create(createTaskDto);

      expect(mockDb.insert).toHaveBeenCalled();
      expect(mockDb.values).toHaveBeenCalledWith({
        title: createTaskDto.title,
        description: createTaskDto.description,
      });
      expect(result).toEqual(mockTask);
    });
  });

  describe('markAsDone', () => {
    it('should mark task as done', async () => {
      const taskId = '550e8400-e29b-41d4-a716-446655440000';
      const mockUpdatedTask = {
        id: taskId,
        title: 'Test Task',
        description: 'Test Description',
        done: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockDb.returning.mockResolvedValue([mockUpdatedTask]);

      const result = await service.markAsDone(taskId);

      expect(mockDb.update).toHaveBeenCalled();
      expect(mockDb.set).toHaveBeenCalledWith({
        done: true,
        updatedAt: expect.any(Date),
      });
      expect(result).toEqual(mockUpdatedTask);
    });

    it('should throw NotFoundException when task not found', async () => {
      const taskId = '550e8400-e29b-41d4-a716-446655440000';

      mockDb.returning.mockResolvedValue([]);

      await expect(service.markAsDone(taskId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should delete a task', async () => {
      const taskId = '550e8400-e29b-41d4-a716-446655440000';
      const mockDeletedTask = {
        id: taskId,
        title: 'Test Task',
        description: 'Test Description',
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockDb.returning.mockResolvedValue([mockDeletedTask]);

      await service.delete(taskId);

      expect(mockDb.delete).toHaveBeenCalled();
      expect(mockDb.where).toHaveBeenCalled();
    });

    it('should throw NotFoundException when task not found', async () => {
      const taskId = '550e8400-e29b-41d4-a716-446655440000';

      mockDb.returning.mockResolvedValue([]);

      await expect(service.delete(taskId)).rejects.toThrow(NotFoundException);
    });
  });
});
