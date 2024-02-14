import { faker } from '@faker-js/faker';
import { IUserFromJwt } from '../../../../modules/auth/interfaces/auth.interface';
import { MockAlmaUser } from '../../../../modules/user/test/mocks/user.mock';
import { CreateTaskDto } from '../../dto/create-task.dto';
import { TaskPriority, TaskStatus } from '@prisma/client';
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

export const MockTask: ITask = {
  id: faker.string.uuid(),
  title: MockCreateTask.title,
  description: MockCreateTask.description,
  priority: MockCreateTask.priority,
  dueDate: MockCreateTask.dueDate,
  status: TaskStatus.TODO,
  categories: MockCreateTask.categories,
  createdAt: faker.date.recent(),
};

export const MockFilterTask: TaskFilterDto = {
  categories: ['SHOPPING'],
  status: ['TODO'],
  priority: 'HIGH',
};

export const MockTaskData: ITaskData = {
  taskId: MockTask.id,
  userId: faker.string.uuid(),
  title: MockTask.title,
  description: MockTask.description,
  priority: MockTask.priority,
  dueDate: new Date(MockTask.dueDate),
  categories: MockTask.categories,
  status: MockTask.status,
  completedAt: null,
  createdAt: MockTask.createdAt,
  updatedAt: faker.date.recent(),
};

export const MockUpdateTask: UpdateTaskDto = {
  status: 'DOING',
};
