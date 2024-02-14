import { faker } from '@faker-js/faker';
import { IUserFromJwt } from '../../../../modules/auth/interfaces/auth.interface';
import { MockAlmaUser } from '../../../../modules/user/test/mocks/user.mock';
import { CreateTaskDto } from '../../dto/create-task.dto';
import { TaskPriority, TaskStatus } from '@prisma/client';
import { ITask } from '../../interfaces/task.interface';

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
