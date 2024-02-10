import { Categories, TaskPriority } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(700)
  description: string;

  @IsOptional()
  @IsEnum(TaskPriority, { each: true })
  @IsString()
  priority?: TaskPriority;

  @IsOptional()
  @IsString()
  @MaxLength(10, { message: 'must be a valid date: yyyy-mm-dd' })
  dueDate?: string;

  @IsOptional()
  @IsEnum(Categories, { each: true })
  @IsString({ each: true })
  categories?: Categories[];
}
