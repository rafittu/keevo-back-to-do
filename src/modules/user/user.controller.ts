import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { CreateUserService } from './services/create-user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { AppError } from 'src/common/errors/Error';
import { IUser } from './interfaces/user.interface';
import { isPublic } from '../auth/infra/decorators/is-public.decorator';

@UseFilters(new HttpExceptionFilter(new AppError()))
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly createUserService: CreateUserService,
  ) {}

  @isPublic()
  @Post('/create')
  create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.createUserService.execute(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
