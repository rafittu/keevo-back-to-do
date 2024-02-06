import { faker } from '@faker-js/faker';
import { CreateUserDto } from '../../dto/create-user.dto';
import { IUser, IUserData } from '../../interfaces/user.interface';
import { IUserFromJwt } from 'src/modules/auth/interfaces/auth.interface';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { IAlmaUser } from '../../interfaces/repository.interface';
import { User } from '@prisma/client';

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

export const MockAlmaUser: IAlmaUser = {
  id: faker.string.uuid(),
  personal: {
    id: faker.string.uuid(),
    firstName: MockCreateUserDto.firstName,
    lastName: MockCreateUserDto.lastName,
    socialName: MockCreateUserDto.socialName,
    bornDate: MockCreateUserDto.bornDate,
    motherName: MockCreateUserDto.motherName,
  },
  contact: {
    id: faker.string.uuid(),
    username: MockCreateUserDto.username,
    email: MockCreateUserDto.email,
    phone: MockCreateUserDto.phone,
  },
  security: {
    id: faker.string.uuid(),
    status: 'PENDING_CONFIRMATION',
  },
  allowedChannels: ['WOPHI'],
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
};

export const MockPrismaUser: User = {
  id: faker.string.uuid(),
  alma_id: MockAlmaUser.id,
  name: `${MockCreateUserDto.firstName} ${MockCreateUserDto.lastName}`,
  social_name: MockCreateUserDto.socialName,
  created_at: faker.date.recent(),
  updated_at: faker.date.recent(),
};

export const MockUser: IUser = {
  id: MockPrismaUser.id,
  name: MockPrismaUser.name,
  socialName: MockPrismaUser.social_name,
  createdAt: MockPrismaUser.created_at,
  updatedAt: MockPrismaUser.updated_at,
};

export const MockAccessToken = faker.string.alphanumeric();

export const MockUserFromJwt: IUserFromJwt = {
  almaId: MockAlmaUser.id,
  username: MockAlmaUser.contact.username,
  email: MockAlmaUser.contact.email,
};

export const MockUserData: IUserData = {
  id: MockUser.id,
  name: MockUser.name,
  socialName: MockUser.socialName,
  bornDate: MockAlmaUser.personal.bornDate,
  motherName: MockAlmaUser.personal.motherName,
  username: MockAlmaUser.contact.username,
  email: MockAlmaUser.contact.email,
  phone: MockAlmaUser.contact.phone,
  status: 'PENDING_CONFIRMATION',
  createdAt: MockAlmaUser.createdAt,
  updatedAt: MockAlmaUser.updatedAt,
};

export const MockUpdateUserDto: UpdateUserDto = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  oldPassword: faker.internet.password(),
  newPassword: 'faker.internet.password()',
  passwordConfirmation: 'faker.internet.password()',
};

export const MockCreateUserAxiosResponse = {
  data: {
    MockAlmaUser,
  },
};

export const MockGetUserAxiosResponse = {
  data: {
    MockAlmaUser,
  },
};
