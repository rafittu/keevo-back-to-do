import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';
import { ITaskRepository } from '../interfaces/repository.interface';
import { AppError } from '../../../common/errors/Error';
import { IUserFromJwt } from '../../../modules/auth/interfaces/auth.interface';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class CreateTaskService {
  constructor(
    @Inject(TaskRepository)
    private taskRepository: ITaskRepository,
  ) {}

  async execute(user: IUserFromJwt, task: CreateTaskDto) {
    const { almaId } = user;

    try {
      return await this.taskRepository.createTask(
        almaId,
        task,
        TaskStatus.TODO,
      );
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(
        'task-service.createTask',
        500,
        'failed to create task',
      );
    }
  }
}
