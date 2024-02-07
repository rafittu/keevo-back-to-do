import { TaskStatus } from '@prisma/client';
import { CreateTaskDto } from '../dto/create-task.dto';

export interface ITaskRepository {
  createTask(almaId: string, task: CreateTaskDto, status: TaskStatus);
}
