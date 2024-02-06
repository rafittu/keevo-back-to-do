import { CreateUserDtoWithChannel } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUser, IUserData } from './user.interface';

export interface IUserRepository {
  createUser(data: CreateUserDtoWithChannel): Promise<IUser>;
  findById(userAlmaId: string, accessToken: string): Promise<IUserData>;
  updateUser(
    accessToken: string,
    dataToUpdate: UpdateUserDto,
  ): Promise<IUserData>;
  deleteUser(accessToken: string, userAlmaId: string): Promise<void>;
}

export interface IAlmaUser {
  id: string;
  personal: {
    id: string;
    firstName: string;
    lastName: string;
    socialName?: string;
    bornDate: string;
    motherName: string;
    updatedAt?: Date;
  };
  contact: {
    id: string;
    username?: string;
    email: string;
    phone: string;
    updatedAt?: Date;
  };
  security: {
    id: string;
    status: string;
    updatedAt?: Date;
  };
  allowedChannels: string[];
  createdAt: Date;
  updatedAt: Date;
}
