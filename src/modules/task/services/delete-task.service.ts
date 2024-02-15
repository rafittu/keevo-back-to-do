import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';
import { ITaskRepository } from '../interfaces/repository.interface';
import { IUserFromJwt } from 'src/modules/auth/interfaces/auth.interface';
import { ITaskData } from '../interfaces/task.interface';

@Injectable()
export class DeleteTaskService {
  constructor(
    @Inject(TaskRepository)
    private taskRepository: ITaskRepository,
  ) {}

  async execute(user: IUserFromJwt, taskId: string): Promise<ITaskData> {
    const { almaId } = user;

    return await this.taskRepository.deleteTask(almaId, taskId);
  }
}
