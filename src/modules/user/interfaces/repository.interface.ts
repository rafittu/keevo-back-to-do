import { CreateUserDtoWithChannel } from '../dto/create-user.dto';
import { IUser } from './user.interface';

export interface IUserRepository {
  createUser(data: CreateUserDtoWithChannel): Promise<IUser>;
  findById(userAlmaId: string, accessToken: string);
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
