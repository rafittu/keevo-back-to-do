import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/filter-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { HttpExceptionFilter } from '../../common/filter/http-exception.filter';
import { AppError } from '../../common/errors/Error';
import { CurrentUser } from '../auth/infra/decorators/current-user.decorator';
import { IUserFromJwt } from '../auth/interfaces/auth.interface';
import { CreateTaskService } from './services/create-task.service';
import { ITask, ITaskData } from './interfaces/task.interface';
import { GetTaskByFilterService } from './services/get-task.service';
import { UpdateTaskService } from './services/update-task.service';
import { DeleteTaskService } from './services/delete-task.service';

@UseFilters(new HttpExceptionFilter(new AppError()))
@Controller('task')
export class TaskController {
  constructor(
    private readonly createTaskService: CreateTaskService,
    private readonly getTaskByFilterService: GetTaskByFilterService,
    private readonly updateTaskService: UpdateTaskService,
    private readonly deleteTaskService: DeleteTaskService,
  ) {}

  @Post('/create')
  create(
    @CurrentUser() user: IUserFromJwt,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<ITask> {
    return this.createTaskService.execute(user, createTaskDto);
  }

  @Get('/filter')
  getByFilter(
    @CurrentUser() user: IUserFromJwt,
    @Query() filterTaskDto: TaskFilterDto,
  ): Promise<ITaskData[]> {
    return this.getTaskByFilterService.execute(user, filterTaskDto);
  }

  @Patch('/update/:id')
  update(
    @CurrentUser() user: IUserFromJwt,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<ITaskData> {
    return this.updateTaskService.execute(user, id, updateTaskDto);
  }

  @Delete('/delete/:id')
  remove(
    @CurrentUser() user: IUserFromJwt,
    @Param('id') id: string,
  ): Promise<ITaskData> {
    return this.deleteTaskService.execute(user, id);
  }
}
