import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import axios from 'axios';
import { PrismaService } from '../../../prisma.service';
import { AppError } from '../../../common/errors/Error';
import { TaskRepository } from '../repository/task.repository';

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
});
