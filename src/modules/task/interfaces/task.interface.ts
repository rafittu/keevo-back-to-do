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

export interface ITaskData {
  taskId: string;
  userId: string;
  title: string;
  description: string;
  priority: string;
  dueDate: Date;
  taskCategories: string[];
  status: string;
  completedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
