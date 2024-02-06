import { faker } from '@faker-js/faker';
import { CredentialsDto } from '../../dto/user-credentials.dto';
import { IUserFromJwt } from '../../interfaces/auth.interface';

export const MockAccessToken = faker.string.alphanumeric();

export const MockUserCredentials: CredentialsDto = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};

export const MockUserFromJwt: IUserFromJwt = {
  almaId: faker.string.uuid(),
  username: faker.internet.userName(),
  email: MockUserCredentials.email,
};

export const MockSignInAxiosResponse = {
  data: {
    accessToken: MockAccessToken,
  },
};
