import { faker } from '@faker-js/faker';
import { IUserFromJwt } from '../../../../modules/auth/interfaces/auth.interface';
import { MockAlmaUser } from '../../../../modules/user/test/mocks/user.mock';
import { CreateTaskDto } from '../../dto/create-task.dto';
import { Task, TaskPriority, TaskStatus } from '@prisma/client';
import { ITask, ITaskData } from '../../interfaces/task.interface';
import { TaskFilterDto } from '../../dto/filter-task.dto';
import { UpdateTaskDto } from '../../dto/update-task.dto';

export const MockUserFromJwt: IUserFromJwt = {
  almaId: MockAlmaUser.id,
  username: MockAlmaUser.contact.username,
  email: MockAlmaUser.contact.email,
};

export const MockCreateTask: CreateTaskDto = {
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  priority: TaskPriority.HIGH,
  dueDate: null,
  categories: ['SHOPPING'],
};

export const MockPrismaTask: Task = {
  id: faker.string.uuid(),
  user_id: faker.string.uuid(),
  title: MockCreateTask.title,
  description: MockCreateTask.description,
  priority: MockCreateTask.priority,
  due_date: new Date(MockCreateTask.dueDate),
  status: TaskStatus.TODO,
  completed_at: null,
  created_at: faker.date.recent(),
  updated_at: faker.date.recent(),
};

export const MockTask: ITask = {
  id: MockPrismaTask.id,
  title: MockCreateTask.title,
  description: MockCreateTask.description,
  priority: MockCreateTask.priority,
  dueDate: MockCreateTask.dueDate,
  status: TaskStatus.TODO,
  categories: MockCreateTask.categories,
  createdAt: MockPrismaTask.created_at,
};

export const MockFilterTask: TaskFilterDto = {
  categories: ['SHOPPING'],
  status: ['TODO'],
  priority: 'HIGH',
};

export const MockTaskData: ITaskData = {
  taskId: MockPrismaTask.id,
  userId: MockPrismaTask.user_id,
  title: MockPrismaTask.title,
  description: MockPrismaTask.description,
  priority: MockPrismaTask.priority,
  dueDate: MockPrismaTask.due_date,
  categories: MockTask.categories,
  status: MockPrismaTask.status,
  completedAt: MockPrismaTask.completed_at,
  createdAt: MockPrismaTask.created_at,
  updatedAt: MockPrismaTask.updated_at,
};

export const MockUpdateTask: UpdateTaskDto = {
  status: 'DOING',
};
