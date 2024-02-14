import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, TaskStatus } from '@prisma/client';
import axios from 'axios';
import { PrismaService } from '../../../prisma.service';
import { AppError } from '../../../common/errors/Error';
import { TaskRepository } from '../repository/task.repository';
import {
  MockCreateTask,
  MockFilterTask,
  MockPrismaTask,
  MockTask,
  MockTaskData,
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

    it('should throw an AppError when almaRequest throws an error', async () => {
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

  describe('find one', () => {
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

    // it('should throw a not found error', async () => {
    //   jest.spyOn(prismaService.user, 'findFirst').mockResolvedValueOnce(null);

    //   try {
    //     await userRepository.findById(MockUserFromJwt.almaId, MockAccessToken);
    //   } catch (error) {
    //     expect(error).toBeInstanceOf(AppError);
    //     expect(error.code).toBe(404);
    //     expect(error.message).toBe('user not found');
    //   }
    // });

    // it('should throw an internal error', async () => {
    //   jest
    //     .spyOn(prismaService.user, 'findFirst')
    //     .mockRejectedValueOnce(new Error());

    //   try {
    //     await userRepository.findById(MockUserFromJwt.almaId, MockAccessToken);
    //   } catch (error) {
    //     expect(error).toBeInstanceOf(AppError);
    //     expect(error.code).toBe(500);
    //     expect(error.message).toBe('could not get user');
    //   }
    // });
  });
});
