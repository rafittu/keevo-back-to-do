import { Categories, TaskPriority, TaskStatus } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

const dateRegexPattern =
  '^([0-9]{4}-((0[13578]|1[02])-([0-2][1-9]|3[0-1])|(0[469]|11)-(0[1-9]|[1-2][0-9]|30)|02-(0[1-9]|[1-2][0-9]))|([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00)-02-29)$';

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
  @Matches(new RegExp(dateRegexPattern), {
    message: 'must be a valid date and formatted as yyyy-mm-dd',
  })
  dueDate?: string;

  @IsNotEmpty()
  @IsEnum(TaskStatus, { each: true })
  @IsString()
  status: TaskStatus;

  @IsOptional()
  @IsString()
  @MaxLength(10, { message: 'must be a valid date: yyyy-mm-dd' })
  @Matches(new RegExp(dateRegexPattern), {
    message: 'must be a valid date and formatted as yyyy-mm-dd',
  })
  completedAt?: string;

  @IsOptional()
  @IsEnum(Categories, { each: true })
  @IsString()
  category?: Categories;
}
