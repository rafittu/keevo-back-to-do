import { CreateUserDto } from '../dto/create-user.dto';

export interface CreateUserDtoWithChannel extends CreateUserDto {
  originChannel: string;
}

export interface IUser {
  id: string;
  name: string;
  socialName: string;
  createdAt: Date;
  updatedAt: Date;
}
