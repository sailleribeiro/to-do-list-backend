import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { NotFoundException } from '@nestjs/common';

// Mock do TasksService
const mockTasksService = {
  findAll: jest.fn(),
  create: jest.fn(),
  markAsDone: jest.fn(),
  delete: jest.fn(),
};

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);

    // Reset mocks
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      mockTasksService.findAll.mockResolvedValue(mockTasks);

      const result = await controller.findAll();

      expect(mockTasksService.findAll).toHaveBeenCalled();
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

      mockTasksService.create.mockResolvedValue(mockTask);

      const result = await controller.create(createTaskDto);

      expect(mockTasksService.create).toHaveBeenCalledWith(createTaskDto);
      expect(result).toEqual(mockTask);
    });
  });

  describe('markAsDone', () => {
    it('should mark task as done', async () => {
      const taskId = '550e8400-e29b-41d4-a716-446655440000';
      const mockTask = {
        id: taskId,
        title: 'Test Task',
        description: 'Test Description',
        done: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTasksService.markAsDone.mockResolvedValue(mockTask);

      const result = await controller.markAsDone({ id: taskId });

      expect(mockTasksService.markAsDone).toHaveBeenCalledWith(taskId);
      expect(result).toEqual(mockTask);
    });
  });

  describe('delete', () => {
    it('should delete a task', async () => {
      const taskId = '550e8400-e29b-41d4-a716-446655440000';

      mockTasksService.delete.mockResolvedValue(undefined);

      await controller.delete({ id: taskId });

      expect(mockTasksService.delete).toHaveBeenCalledWith(taskId);
    });
  });
});
