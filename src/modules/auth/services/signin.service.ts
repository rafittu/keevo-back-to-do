import { Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from '../repository/auth.repository';
import { IAuthRepository } from '../interfaces/repository.interface';
import { CredentialsDto } from '../dto/user-credentials.dto';
import { IJwtToken } from '../interfaces/auth.interface';

@Injectable()
export class SignInService {
  constructor(
    @Inject(AuthRepository)
    private authRepository: IAuthRepository,
  ) {}

  execute(credentials: CredentialsDto): Promise<IJwtToken> {
    return this.authRepository.signIn({ ...credentials, origin: 'wophi' });
  }
}
