import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { PrismaService } from '../../prisma.service';
import { TaskRepository } from './repository/task.repository';
import { CreateTaskService } from './services/create-task.service';
import { GetTaskByFilterService } from './services/get-task.service';
import { UpdateTaskService } from './services/update-task.service';

@Module({
  controllers: [TaskController],
  providers: [
    PrismaService,
    TaskRepository,
    CreateTaskService,
    GetTaskByFilterService,
    UpdateTaskService,
  ],
})
export class TaskModule {}
