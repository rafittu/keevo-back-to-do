import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthRepository } from './repository/auth.repository';
import { SignInService } from './services/signin.service';
import { JwtStrategy } from './infra/strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [JwtStrategy, AuthRepository, SignInService],
})
export class AuthModule {}
