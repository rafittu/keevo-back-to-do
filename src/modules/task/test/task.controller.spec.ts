import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from '../task.controller';
import { CreateTaskService } from '../services/create-task.service';
import { GetTaskByFilterService } from '../services/get-task.service';
import { UpdateTaskService } from '../services/update-task.service';
import { DeleteTaskService } from '../services/delete-task.service';
import {
  MockCreateTask,
  MockFilterTask,
  MockTask,
  MockTaskData,
  MockUserFromJwt,
} from './mocks/task.mock';

describe('TaskController', () => {
  let controller: TaskController;
  let createTaskService: CreateTaskService;
  let getTaskByFilterService: GetTaskByFilterService;
  let updateTaskService: UpdateTaskService;
  let deleteTaskService: DeleteTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: CreateTaskService,
          useValue: {
            execute: jest.fn().mockResolvedValue(MockTask),
          },
        },
        {
          provide: GetTaskByFilterService,
          useValue: {
            execute: jest.fn().mockResolvedValue([MockTaskData]),
          },
        },
        {
          provide: UpdateTaskService,
          useValue: {
            execute: jest.fn().mockResolvedValue('MockTaskData'),
          },
        },
        {
          provide: DeleteTaskService,
          useValue: {
            execute: jest.fn().mockResolvedValue('MockTaskData'),
          },
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    createTaskService = module.get<CreateTaskService>(CreateTaskService);
    getTaskByFilterService = module.get<GetTaskByFilterService>(
      GetTaskByFilterService,
    );
    updateTaskService = module.get<UpdateTaskService>(UpdateTaskService);
    deleteTaskService = module.get<DeleteTaskService>(DeleteTaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create task', () => {
    it('should create a new task successfully', async () => {
      const result = await controller.create(MockUserFromJwt, MockCreateTask);

      expect(createTaskService.execute).toHaveBeenCalledTimes(1);
      expect(result).toEqual(MockTask);
    });

    it('should throw an error', () => {
      jest
        .spyOn(createTaskService, 'execute')
        .mockRejectedValueOnce(new Error());

      expect(
        controller.create(MockUserFromJwt, MockCreateTask),
      ).rejects.toThrow();
    });
  });

  describe('get task by filter', () => {
    it('should get tasks by filter successfully', async () => {
      const result = await controller.getByFilter(
        MockUserFromJwt,
        MockFilterTask,
      );

      expect(getTaskByFilterService.execute).toHaveBeenCalledTimes(1);
      expect(result).toEqual([MockTaskData]);
    });

    it('should throw an error', () => {
      jest
        .spyOn(getTaskByFilterService, 'execute')
        .mockRejectedValueOnce(new Error());

      expect(controller.getByFilter(MockUserFromJwt, {})).rejects.toThrow();
    });
  });
});
