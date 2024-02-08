import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';
import { ITaskRepository } from '../interfaces/repository.interface';
import { IUserFromJwt } from 'src/modules/auth/interfaces/auth.interface';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class UpdateTaskService {
  constructor(
    @Inject(TaskRepository)
    private taskRepository: ITaskRepository,
  ) {}

  async execute(
    user: IUserFromJwt,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ) {
    const { almaId } = user;

    if (updateTaskDto.status && updateTaskDto.status === TaskStatus.DONE) {
      updateTaskDto.completedAt = new Date().toISOString();
    }

    return await this.taskRepository.updateTask(almaId, taskId, updateTaskDto);
  }
}
