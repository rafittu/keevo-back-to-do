import { Test, TestingModule } from '@nestjs/testing';
import { TaskRepository } from '../repository/task.repository';
import { CreateTaskService } from '../services/create-task.service';
import { GetTaskByFilterService } from '../services/get-task.service';
import { UpdateTaskService } from '../services/update-task.service';
import { DeleteTaskService } from '../services/delete-task.service';
import {
  MockCreateTask,
  MockFilterTask,
  MockTask,
  MockTaskData,
  MockUpdateTask,
  MockUserFromJwt,
} from './mocks/task.mock';
import { AppError } from '../../../common/errors/Error';
import { TaskStatus } from '@prisma/client';
import * as Validations from '../utils/validations';

describe('Task Services', () => {
  let createTaskService: CreateTaskService;
  let findTaskService: GetTaskByFilterService;
  let updateTaskService: UpdateTaskService;
  let deleteTaskService: DeleteTaskService;

  let taskRepository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTaskService,
        GetTaskByFilterService,
        UpdateTaskService,
        DeleteTaskService,
        {
          provide: TaskRepository,
          useValue: {
            createTask: jest.fn().mockResolvedValue(MockTask),
            taskByFilter: jest.fn().mockResolvedValue([MockTaskData]),
            updateTask: jest.fn().mockResolvedValue(MockTaskData),
            deleteTask: jest.fn().mockResolvedValue(MockTaskData),
          },
        },
      ],
    }).compile();

    createTaskService = module.get<CreateTaskService>(CreateTaskService);
    findTaskService = module.get<GetTaskByFilterService>(
      GetTaskByFilterService,
    );
    updateTaskService = module.get<UpdateTaskService>(UpdateTaskService);
    deleteTaskService = module.get<DeleteTaskService>(DeleteTaskService);

    taskRepository = module.get<TaskRepository>(TaskRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(createTaskService).toBeDefined();
    expect(findTaskService).toBeDefined();
    expect(updateTaskService).toBeDefined();
    expect(deleteTaskService).toBeDefined();
  });

  describe('create task', () => {
    it('should create a new one successfully', async () => {
      const result = await createTaskService.execute(
        MockUserFromJwt,
        MockCreateTask,
      );

      expect(taskRepository.createTask).toHaveBeenCalledTimes(1);
      expect(result).toEqual(MockTask);
    });

    it('should validate task due date', async () => {
      jest.spyOn(Validations, 'isValidDueDate').mockReturnValue(false);

      const mockCreate = {
        ...MockCreateTask,
        dueDate: '2024-02-13',
      };

      try {
        await createTaskService.execute(MockUserFromJwt, mockCreate);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.code).toBe(400);
      }
    });

    it('should throw an App Error', async () => {
      jest
        .spyOn(taskRepository, 'createTask')
        .mockRejectedValueOnce(
          new AppError('error.code', 400, 'Error message'),
        );

      try {
        await createTaskService.execute(MockUserFromJwt, MockCreateTask);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.code).toBe(400);
      }
    });

    it('should throw an internal error', async () => {
      jest
        .spyOn(taskRepository, 'createTask')
        .mockRejectedValueOnce(new Error());

      try {
        await createTaskService.execute(MockUserFromJwt, MockCreateTask);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.code).toBe(500);
      }
    });
  });

  describe('find task', () => {
    it('should find tasks successfully', async () => {
      const result = await findTaskService.execute(
        MockUserFromJwt,
        MockFilterTask,
      );

      expect(taskRepository.taskByFilter).toHaveBeenCalledTimes(1);
      expect(result).toEqual([MockTaskData]);
    });
  });

  describe('update task', () => {
    it('should update task successfully', async () => {
      const mockUpdate = {
        ...MockUpdateTask,
        status: TaskStatus.DONE,
      };

      const result = await updateTaskService.execute(
        MockUserFromJwt,
        MockTask.id,
        mockUpdate,
      );

      expect(taskRepository.updateTask).toHaveBeenCalledTimes(1);
      expect(result).toEqual(MockTaskData);
    });

    it('should throw an App Error', async () => {
      try {
        await updateTaskService.execute(MockUserFromJwt, null, MockUpdateTask);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.code).toBe(400);
      }
    });
  });

  describe('delete task', () => {
    it('should delete task successfully', async () => {
      const result = await deleteTaskService.execute(
        MockUserFromJwt,
        MockTask.id,
      );

      expect(taskRepository.deleteTask).toHaveBeenCalledTimes(1);
      expect(result).toEqual(MockTaskData);
    });
  });
});
