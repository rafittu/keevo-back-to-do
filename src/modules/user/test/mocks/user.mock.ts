import { faker } from '@faker-js/faker';
import { CreateUserDto } from '../../dto/create-user.dto';
import { IUser, IUserData } from '../../interfaces/user.interface';
import { IUserFromJwt } from 'src/modules/auth/interfaces/auth.interface';

export const MockCreateUserDto: CreateUserDto = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  socialName: faker.person.fullName(),
  bornDate: faker.date.birthdate().toISOString().split('T')[0],
  motherName: faker.person.fullName({ sex: 'female' }),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  password: 'faker.internet.password()',
  passwordConfirmation: 'faker.internet.password()',
};

export const MockIUser: IUser = {
  id: faker.string.uuid(),
  name: `${MockCreateUserDto.firstName} ${MockCreateUserDto.lastName}`,
  socialName: MockCreateUserDto.socialName,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const MockAccessToken = faker.string.alphanumeric();

export const MockUserFromJwt: IUserFromJwt = {
  almaId: faker.string.uuid(),
  username: MockCreateUserDto.username,
  email: MockCreateUserDto.email,
};

export const MockUserData: IUserData = {
  id: MockIUser.id,
  name: `${MockCreateUserDto.firstName} ${MockCreateUserDto.lastName}`,
  socialName: MockCreateUserDto.socialName,
  bornDate: MockCreateUserDto.bornDate,
  motherName: MockCreateUserDto.motherName,
  username: MockCreateUserDto.username,
  email: MockCreateUserDto.email,
  phone: MockCreateUserDto.phone,
  status: 'PENDING_CONFIRMATION',
  createdAt: MockIUser.createdAt,
  updatedAt: MockIUser.updatedAt,
};
