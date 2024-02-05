import { CreateUserDto } from '../dto/create-user.dto';

export interface CreateUserDtoWithChannel extends CreateUserDto {
  originChannel: string;
}
