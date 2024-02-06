import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { IUserRepository } from '../interfaces/repository.interface';

@Injectable()
export class FindUserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  async execute(userAlmaId: string, accessToken: string) {
    const user = await this.userRepository.findById(userAlmaId, accessToken);

    return user;
  }
}
