import { Test, TestingModule } from '@nestjs/testing';
import { TaskRepository } from '../repository/task.repository';
import { CreateTaskService } from '../services/create-task.service';
import { GetTaskByFilterService } from '../services/get-task.service';
import { UpdateTaskService } from '../services/update-task.service';
import { DeleteTaskService } from '../services/delete-task.service';

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
            createTask: jest.fn().mockResolvedValue(''),
            taskByFilter: jest.fn().mockResolvedValue(''),
            updateTask: jest.fn().mockResolvedValue(''),
            deleteTask: jest.fn().mockResolvedValue(null),
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
});
