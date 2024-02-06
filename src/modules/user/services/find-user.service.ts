import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { IUserRepository } from '../interfaces/repository.interface';

@Injectable()
export class FindUserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  async execute(userId: string) {
    const user = await this.userRepository.findOne(userId);

    return user;
  }
}
