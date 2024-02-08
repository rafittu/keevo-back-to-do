import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { AppError } from '../../../common/errors/Error';
import { ITaskRepository } from '../interfaces/repository.interface';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Prisma, TaskStatus } from '@prisma/client';
import { ITask } from '../interfaces/task.interface';
import { TaskFilterDto } from '../dto/filter-task.dto';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(private prisma: PrismaService) {}

  async createTask(
    almaId: string,
    task: CreateTaskDto,
    status: TaskStatus,
  ): Promise<ITask> {
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

      const { id, created_at } = createdTask;

      return {
        id,
        title,
        description,
        priority,
        dueDate,
        status,
        categories,
        createdAt: created_at,
      };
    } catch (error) {
      throw new AppError(
        'task-repository.createTask',
        500,
        'internal server error',
      );
    }
  }

  async taskByFilter(almaId: string, filter: TaskFilterDto) {
    const { taskId, priority, dueDate, categories, status, completedAt } =
      filter;

    try {
      const taskWhereQuery: Prisma.TaskWhereInput = {
        user: { alma_id: almaId },
        ...(taskId && { id: taskId }),
        ...(priority && { priority }),
        ...(dueDate && { due_date: new Date(dueDate) }),
        ...(status && typeof status === 'string'
          ? { status: { equals: status } }
          : { status: { in: status } }),
        ...(completedAt && { completed_at: new Date(completedAt) }),
        ...(categories
          ? {
              taskCategory: {
                some: {
                  category: {
                    name: {
                      in: Array.isArray(categories) ? categories : [categories],
                    },
                  },
                },
              },
            }
          : {}),
      };

      const tasks = await this.prisma.task.findMany({
        where: taskWhereQuery,
        include: {
          taskCategory: {
            include: {
              category: true,
            },
          },
        },
      });

      const formattedTasks = tasks.map((task) => ({
        ...task,
        taskCategory: task.taskCategory.map((tc) => tc.category.name),
      }));

      return formattedTasks;
    } catch (error) {
      throw new AppError(
        'task-repository.findTaskByFilter',
        500,
        'failed to fetch tasks by filter',
      );
    }
  }
}
