import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';
import { ITaskRepository } from '../interfaces/repository.interface';
import { IUserFromJwt } from 'src/modules/auth/interfaces/auth.interface';
import { TaskFilterDto } from '../dto/filter-task.dto';
import { ITaskData } from '../interfaces/task.interface';

@Injectable()
export class GetTaskByFilterService {
  constructor(
    @Inject(TaskRepository)
    private taskRepository: ITaskRepository,
  ) {}

  async execute(
    user: IUserFromJwt,
    filter: TaskFilterDto,
  ): Promise<ITaskData | ITaskData[]> {
    const { almaId } = user;

    return await this.taskRepository.taskByFilter(almaId, filter);
  }
}
