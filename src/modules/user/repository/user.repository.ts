import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { AppError } from '../../../common/errors/Error';
import { IUserRepository } from '../interfaces/repository.interface';
import axios from 'axios';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  private async almaRequest<T>(
    path: string,
    accessToken: string,
    method: 'post' | 'get' | 'patch',
    body?: object,
  ): Promise<T> {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response =
        method === 'post'
          ? await axios.post(path, body, config)
          : method === 'patch'
            ? await axios.patch(path, body, config)
            : await axios.get(path, config);

      return response.data;
    } catch (error) {
      const { status, code, message } = error.response?.data?.error || {};
      throw new AppError(status, code, message);
    }
  }
}
