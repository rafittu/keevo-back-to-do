import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { UserRepository } from './repository/user.repository';
import { UserController } from './user.controller';
import { CreateUserService } from './services/create-user.service';

import { FindUserService } from './services/find-user.service';
import { UpdateUserService } from './services/update-user.service';
import { DeleteUserService } from './services/delete-user.service';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    UserRepository,
    CreateUserService,
    FindUserService,
    UpdateUserService,
    DeleteUserService,
  ],
})
export class UserModule {}
