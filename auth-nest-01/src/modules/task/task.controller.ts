// src/modules/task/task.controller.ts
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TaskIdParamDto } from './dtos/task-id-param.dto';
import { Task } from 'generated/prisma';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get('get-all-tasks')
    getAllTasks(@Req() req): Promise<Task[]> {
        return this.taskService.getAllTasks(req.user.user_id);
    }

    @Get('find-task/:id')
    getTaskById(@Param() { id }: TaskIdParamDto, @Req() req): Promise<Task> {
        return this.taskService.getTaskById(req.user.user_id, id);
    }

    @Post('create-task')
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @Req() req,
    ): Promise<Task> {
        return this.taskService.createTask(req.user.user_id, createTaskDto);
    }

    @Put('update-task/:id')
    updateTask(
        @Param() { id }: TaskIdParamDto,
        @Body() updateTaskDto: UpdateTaskDto,
        @Req() req,
    ): Promise<Task> {
        return this.taskService.updateTask(req.user.user_id, id, updateTaskDto);
    }

    @Delete('delete-task/:id')
    deleteTask(
        @Param() { id }: TaskIdParamDto,
        @Req() req,
    ): Promise<{ message: string }> {
        return this.taskService.deleteTask(req.user.user_id, id);
    }

    @Delete('delete-all-task')
    deleteAllTasks(@Req() req): Promise<{ message: string }> {
        return this.taskService.deleteAllTasks(req.user.user_id);
    }
}
