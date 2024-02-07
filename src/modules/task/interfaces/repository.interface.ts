import { TaskStatus } from '@prisma/client';
import { CreateTaskDto } from '../dto/create-task.dto';
import { ITask } from './task.interface';

export interface ITaskRepository {
  createTask(
    almaId: string,
    task: CreateTaskDto,
    status: TaskStatus,
  ): Promise<ITask>;
}
