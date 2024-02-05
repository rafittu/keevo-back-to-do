import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthRepository } from './repository/auth.repository';
import { SignInService } from './services/signin.service';

@Module({
  controllers: [AuthController],
  providers: [AuthRepository, SignInService],
})
export class AuthModule {}
