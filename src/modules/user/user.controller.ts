import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { CreateUserService } from './services/create-user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from '../../common/filter/http-exception.filter';
import { AppError } from '../../common/errors/Error';
import { IUser, IUserData } from './interfaces/user.interface';
import { isPublic } from '../auth/infra/decorators/is-public.decorator';
import { CurrentUser } from '../auth/infra/decorators/current-user.decorator';
import { IUserFromJwt } from '../auth/interfaces/auth.interface';
import { FindUserService } from './services/find-user.service';
import { AccessToken } from '../auth/infra/decorators/access-token.decortor';
import { UpdateUserService } from './services/update-user.service';
import { DeleteUserService } from './services/delete-user.service';

@UseFilters(new HttpExceptionFilter(new AppError()))
@Controller('user')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly findUserService: FindUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
  ) {}

  @isPublic()
  @Post('/create')
  create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.createUserService.execute(createUserDto);
  }

  @Get('/')
  findOne(
    @AccessToken() accessToken: string,
    @CurrentUser() user: IUserFromJwt,
  ): Promise<IUserData> {
    return this.findUserService.execute(user.almaId, accessToken);
  }

  @Patch('/update')
  update(
    @AccessToken() accessToken: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUserData> {
    return this.updateUserService.execute(accessToken, updateUserDto);
  }

  @Delete('/delete')
  remove(
    @AccessToken() accessToken: string,
    @CurrentUser() user: IUserFromJwt,
  ): Promise<void> {
    return this.deleteUserService.execute(accessToken, user.almaId);
  }
}
