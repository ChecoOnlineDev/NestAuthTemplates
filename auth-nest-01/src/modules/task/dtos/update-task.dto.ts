import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { TaskStatus } from 'generated/prisma';

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    task_title?: string;

    @IsOptional()
    @IsString()
    task_description?: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    task_status?: TaskStatus;

    @IsOptional()
    @IsDateString()
    due_date?: string;
}
