import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { PrismaService } from '../../prisma.service';
import { TaskRepository } from './repository/task.repository';
import { CreateTaskService } from './services/create-task.service';

@Module({
  controllers: [TaskController],
  providers: [PrismaService, TaskRepository, CreateTaskService],
})
export class TaskModule {}
