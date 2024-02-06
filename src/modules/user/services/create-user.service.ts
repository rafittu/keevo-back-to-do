import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { IUserRepository } from '../interfaces/repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { AppError } from '../../../common/errors/Error';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  async execute(userData: CreateUserDto): Promise<IUser> {
    try {
      const user = await this.userRepository.createUser({
        ...userData,
        originChannel: 'WOPHI',
      });

      return user;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(
        'user-service.createUser',
        500,
        'failed to create user',
      );
    }
  }
}
