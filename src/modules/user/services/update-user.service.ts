import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { IUserRepository } from '../interfaces/repository.interface';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUserData } from '../interfaces/user.interface';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  execute(
    accessToken: string,
    dataToUpdate: UpdateUserDto,
  ): Promise<IUserData> {
    return this.userRepository.updateUser(accessToken, dataToUpdate);
  }
}
