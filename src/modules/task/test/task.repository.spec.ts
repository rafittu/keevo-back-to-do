import { Test, TestingModule } from '@nestjs/testing';
import { Categories, Prisma, TaskStatus } from '@prisma/client';
import { PrismaService } from '../../../prisma.service';
import { AppError } from '../../../common/errors/Error';
import { TaskRepository } from '../repository/task.repository';
import {
  MockCreateTask,
  MockFilterTask,
  MockPrismaTask,
  MockTask,
  MockTaskData,
  MockUpdateTask,
  MockUserFromJwt,
} from './mocks/task.mock';

jest.mock('axios');

describe('UserRepository', () => {
  let taskRepository: TaskRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskRepository, PrismaService],
    }).compile();

    taskRepository = module.get<TaskRepository>(TaskRepository);
    prismaService = module.get<PrismaService>(PrismaService);

    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(taskRepository).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  describe('format task responses', () => {
    it('should format one task', async () => {
      const result = taskRepository['formatTask'](MockPrismaTask);

      const MockResult = {
        ...result,
        categories: MockTaskData.categories,
      };

      expect(MockResult).toEqual(MockTaskData);
    });

    it('should format many tasks', async () => {
      jest
        .spyOn(taskRepository as any, 'formatManyTasks')
        .mockReturnValueOnce(MockTaskData);

      const result = taskRepository['formatManyTasks']([MockPrismaTask]);

      expect(taskRepository['formatManyTasks']).toHaveBeenCalledTimes(1);
      expect(result).toEqual(MockTaskData);
    });
  });

  describe('create task', () => {
    it('should create a new task successfully', async () => {
      jest
        .spyOn(prismaService.task, 'create')
        .mockResolvedValueOnce(MockPrismaTask);

      const result = await taskRepository.createTask(
        MockUserFromJwt.almaId,
        MockCreateTask,
        TaskStatus.TODO,
      );

      expect(prismaService.task.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(MockTask);
    });

    it('should throw an AppError', async () => {
      jest
        .spyOn(prismaService.task, 'create')
        .mockRejectedValueOnce(new Error());

      try {
        await taskRepository.createTask(
          MockUserFromJwt.almaId,
          MockCreateTask,
          TaskStatus.TODO,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.code).toBe(500);
        expect(error.message).toBe('internal server error');
      }
    });
  });

  describe('find task by filter', () => {
    it('should find tasks by filter', async () => {
      jest
        .spyOn(prismaService.task, 'findMany')
        .mockResolvedValueOnce([MockPrismaTask]);

      const result = await taskRepository.taskByFilter(
        MockUserFromJwt.almaId,
        MockFilterTask,
      );

      const MockResult = {
        ...result[0],
        categories: MockTaskData.categories,
      };

      expect(prismaService.task.findMany).toHaveBeenCalledTimes(1);
      expect([MockResult]).toEqual([MockTaskData]);
    });

    it('should throw an AppError', async () => {
      jest
        .spyOn(prismaService.task, 'findMany')
        .mockRejectedValueOnce(new Error());

      try {
        await taskRepository.taskByFilter(
          MockUserFromJwt.almaId,
          MockFilterTask,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.code).toBe(500);
        expect(error.message).toBe('failed to fetch tasks by filter');
      }
    });
  });

  describe('update', () => {
    it('should update task successfully', async () => {
      jest
        .spyOn(prismaService.taskCategory, 'deleteMany')
        .mockResolvedValueOnce(null);

      jest
        .spyOn(prismaService.task, 'update')
        .mockResolvedValueOnce(MockPrismaTask);

      const MockUpdate = {
        ...MockUpdateTask,
        categories: [Categories.WORK],
      };

      const result = await taskRepository.updateTask(
        MockUserFromJwt.almaId,
        MockTask.id,
        MockUpdate,
      );

      const MockResult = {
        ...result,
        categories: MockTaskData.categories,
      };

      expect(prismaService.taskCategory.deleteMany).toHaveBeenCalledTimes(1);
      expect(prismaService.task.update).toHaveBeenCalledTimes(1);
      expect(MockResult).toEqual(MockTaskData);
    });

    it('should throw an AppError', async () => {
      jest
        .spyOn(prismaService.taskCategory, 'deleteMany')
        .mockRejectedValueOnce(new Error());

      try {
        const MockUpdate = {
          ...MockUpdateTask,
          categories: [Categories.WORK],
        };

        await taskRepository.updateTask(
          MockUserFromJwt.almaId,
          MockTask.id,
          MockUpdate,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.code).toBe(500);
        expect(error.message).toBe('failed to update task');
      }
    });
  });
});
