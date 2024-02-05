import { Controller, Post, Body, UseFilters, Get } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { AppError } from 'src/common/errors/Error';
import { SignInService } from './services/signin.service';
import { CredentialsDto } from './dto/user-credentials.dto';
import { IUserFromJwt, IUserToken } from './interfaces/auth.interface';
import { isPublic } from './infra/decorators/is-public.decorator';
import { CurrentUser } from './infra/decorators/current-user.decorator';

@UseFilters(new HttpExceptionFilter(new AppError()))
@Controller('auth')
export class AuthController {
  constructor(private readonly signInService: SignInService) {}

  @isPublic()
  @Post('/signin')
  signIn(@Body() credentials: CredentialsDto): Promise<IUserToken> {
    return this.signInService.execute(credentials);
  }

  @Get('/me')
  getMe(@CurrentUser() user: IUserFromJwt) {
    return user;
  }
}
