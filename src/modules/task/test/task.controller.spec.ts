import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from '../task.controller';
import { CreateTaskService } from '../services/create-task.service';
import { GetTaskByFilterService } from '../services/get-task.service';
import { UpdateTaskService } from '../services/update-task.service';
import { DeleteTaskService } from '../services/delete-task.service';

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
            execute: jest.fn().mockResolvedValue('MockTask'),
          },
        },
        {
          provide: GetTaskByFilterService,
          useValue: {
            execute: jest.fn().mockResolvedValue(['MockTaskData']),
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
});
