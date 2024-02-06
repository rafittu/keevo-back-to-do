import { faker } from '@faker-js/faker';
import { CreateUserDto } from '../../dto/create-user.dto';
import { IUser, IUserData } from '../../interfaces/user.interface';
import { IUserFromJwt } from 'src/modules/auth/interfaces/auth.interface';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { IAlmaUser } from '../../interfaces/repository.interface';

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

export const MockUser: IUser = {
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
  id: MockUser.id,
  name: `${MockCreateUserDto.firstName} ${MockCreateUserDto.lastName}`,
  socialName: MockCreateUserDto.socialName,
  bornDate: MockCreateUserDto.bornDate,
  motherName: MockCreateUserDto.motherName,
  username: MockCreateUserDto.username,
  email: MockCreateUserDto.email,
  phone: MockCreateUserDto.phone,
  status: 'PENDING_CONFIRMATION',
  createdAt: MockUser.createdAt,
  updatedAt: MockUser.updatedAt,
};

export const MockUpdateUserDto: UpdateUserDto = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  oldPassword: faker.internet.password(),
  newPassword: 'faker.internet.password()',
  passwordConfirmation: 'faker.internet.password()',
};

export const MockAlmaUser: IAlmaUser = {
  id: MockUserFromJwt.almaId,
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
    status: faker.string.sample(),
  },
  allowedChannels: ['WOPHI'],
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
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
