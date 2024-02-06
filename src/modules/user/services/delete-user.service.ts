import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { IUserRepository } from '../interfaces/repository.interface';

@Injectable()
export class DeleteUserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  async execute(accessToken: string, userAlmaId: string): Promise<void> {
    return await this.userRepository.deleteUser(accessToken, userAlmaId);
  }
}
