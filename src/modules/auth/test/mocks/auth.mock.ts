import { faker } from '@faker-js/faker';
import { CredentialsDto } from '../../dto/user-credentials.dto';

export const MockAccessToken = faker.string.alphanumeric();

export const MockUserCredentials: CredentialsDto = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};
