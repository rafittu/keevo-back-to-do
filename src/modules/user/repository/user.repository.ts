import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import axios from 'axios';
import { PrismaService } from '../../../prisma.service';
import { AppError } from '../../../common/errors/Error';
import { IUserRepository, IAlmaUser } from '../interfaces/repository.interface';
import { CreateUserDtoWithChannel } from '../interfaces/user.interface';

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

  async createUser(createUser: CreateUserDtoWithChannel) {
    const signUpPath: string = process.env.SIGNUP_PATH;

    try {
      const almaUser = await this.almaRequest<IAlmaUser>(
        signUpPath,
        null,
        'post',
        createUser,
      );

      const user = await this.prisma.user.create({
        data: {
          alma_id: almaUser.id,
          name: `${createUser.firstName} ${createUser.lastName}`,
          social_name: createUser.socialName,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new AppError(
          `user-repository.createUser`,
          400,
          `[ '${error.meta?.target}' ] already in use`,
        );
      }

      throw new AppError('user-repository.createUser', 500, 'user not created');
    }
  }
}
