import { faker } from '@faker-js/faker';
import { CreateUserDto } from '../../dto/create-user.dto';
import { IUser } from '../../interfaces/user.interface';

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
