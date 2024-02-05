import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IAuthRepository } from '../interfaces/repository.interface';
import { AppError } from '../../../common/errors/Error';
import { CredentialsDtoWithChannel } from '../dto/user-credentials.dto';
import { IUserToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor() {}

  private async almaRequest<T>(path: string, body: object): Promise<T> {
    try {
      const response = await axios.post(path, body);
      return response.data;
    } catch (error) {
      const { status, code, message } = error.response?.data?.error || {};
      throw new AppError(status, code, message);
    }
  }

  async signIn(credentials: CredentialsDtoWithChannel): Promise<IUserToken> {
    const signInPath: string = process.env.SIGNIN_PATH;

    try {
      const { accessToken } = await this.almaRequest<IUserToken>(
        signInPath,
        credentials,
      );

      return { accessToken };
    } catch (error) {
      const { status, message } = error || {};

      if (error instanceof AppError) {
        throw new AppError(status, 400, message);
      }

      throw new AppError(
        'auth-repository.signIn',
        500,
        'internal server error',
      );
    }
  }
}
