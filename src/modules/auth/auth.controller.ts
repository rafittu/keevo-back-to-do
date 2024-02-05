import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { AppError } from 'src/common/errors/Error';
import { SignInService } from './services/signin.service';
import { CredentialsDto } from './dto/user-credentials.dto';
import { IJwtToken } from './interfaces/auth.interface';

@UseFilters(new HttpExceptionFilter(new AppError()))
@Controller('auth')
export class AuthController {
  constructor(private readonly signInService: SignInService) {}

  @Post('/signin')
  signIn(@Body() credentials: CredentialsDto): Promise<IJwtToken> {
    return this.signInService.execute(credentials);
  }
}
