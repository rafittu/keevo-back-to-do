import { Categories, TaskPriority, TaskStatus } from '@prisma/client';

export interface ITask {
  id: string;
  title: string;
  description: string;
  priority?: TaskPriority;
  dueDate?: string;
  status: TaskStatus;
  categories?: Categories[];
  createdAt: Date;
}
