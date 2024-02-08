import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { AppError } from '../../../common/errors/Error';
import { ITaskRepository } from '../interfaces/repository.interface';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Prisma, TaskStatus } from '@prisma/client';
import { ITask, ITaskData } from '../interfaces/task.interface';
import { TaskFilterDto } from '../dto/filter-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(private prisma: PrismaService) {}

  private formatTask(task: any): ITaskData {
    return {
      taskId: task.id,
      userId: task.user_id,
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.due_date,
      status: task.status,
      completedAt: task.completed_at,
      categories: task.taskCategory,
      createdAt: task.created_at,
      updatedAt: task.updated_at,
    };
  }

  private formatManyTasks(data: any): ITaskData[] {
    return data.map((task) => this.formatTask(task));
  }

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

  async taskByFilter(
    almaId: string,
    filter: TaskFilterDto,
  ): Promise<ITaskData[]> {
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

      return this.formatManyTasks(formattedTasks);
    } catch (error) {
      throw new AppError(
        'task-repository.findTaskByFilter',
        500,
        'failed to fetch tasks by filter',
      );
    }
  }

  async updateTask(
    almaId: string,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<ITaskData> {
    const {
      title,
      description,
      priority,
      dueDate,
      completedAt,
      status,
      categories,
    } = updateTaskDto;

    try {
      if (categories) {
        await this.prisma.taskCategory.deleteMany({
          where: {
            task: {
              user: {
                alma_id: almaId,
              },
            },
            task_id: taskId,
          },
        });
      }

      const taskCategoryData = (categories || []).map((categoryName) => ({
        category: { connect: { name: categoryName } },
      }));

      const updatedTask = await this.prisma.task.update({
        where: {
          id: taskId,
          user: {
            alma_id: almaId,
          },
        },
        data: {
          title,
          description,
          priority,
          due_date: dueDate ? new Date(dueDate) : undefined,
          completed_at: completedAt ? new Date(completedAt) : undefined,
          status,
          taskCategory: {
            create: taskCategoryData,
          },
        },
        include: {
          taskCategory: {
            include: {
              category: true,
            },
          },
        },
      });

      const formatTaskCategory = {
        ...updatedTask,
        taskCategory: updatedTask.taskCategory.map((tc) => tc.category.name),
      };

      return this.formatTask(formatTaskCategory);
    } catch (error) {
      throw new AppError(
        'task-repository.updateTask',
        500,
        'failed to update task',
      );
    }
  }

  async deleteTask(almaId: string, taskId: string): Promise<ITaskData> {
    try {
      await this.prisma.taskCategory.deleteMany({
        where: {
          task_id: taskId,
          task: {
            user: {
              alma_id: almaId,
            },
          },
        },
      });

      const deletedTask = await this.prisma.task.delete({
        where: {
          id: taskId,
          user: {
            alma_id: almaId,
          },
        },
      });

      return this.formatTask(deletedTask);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new AppError(
          'task-repository.deleteTask',
          500,
          'task to delete does not exist',
        );
      }

      throw new AppError(
        'task-repository.deleteTask',
        500,
        'failed to delete task',
      );
    }
  }
}
