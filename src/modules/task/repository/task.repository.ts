import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { AppError } from '../../../common/errors/Error';
import { ITaskRepository } from '../interfaces/repository.interface';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(private prisma: PrismaService) {}

  async createTask(almaId: string, task: CreateTaskDto, status: TaskStatus) {
    const { title, description, priority, dueDate, categories } = task;

    try {
      const taskCategoryData = (categories || []).map((categoryName) => ({
        category: { connect: { name: categoryName } },
      }));

      const createdTask = await this.prisma.task.create({
        data: {
          user: { connect: { alma_id: almaId } },
          title,
          description,
          priority,
          due_date: dueDate ? new Date(dueDate) : undefined,
          status,
          taskCategory: {
            create: taskCategoryData,
          },
        },
      });

      return createdTask;
    } catch (error) {
      throw new AppError(
        'task-repository.createTask',
        500,
        'internal server error',
      );
    }
  }
}
