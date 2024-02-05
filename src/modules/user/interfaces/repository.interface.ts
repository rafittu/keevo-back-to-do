import { CreateUserDtoWithChannel } from './user.interface';

export interface IUserRepository {
  createUser(data: CreateUserDtoWithChannel);
}
