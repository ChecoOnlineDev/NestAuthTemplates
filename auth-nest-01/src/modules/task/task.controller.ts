import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Get('get-all-tasks')
    getAllTasks() {
        return this.taskService.getAllTasks();
    }

    @Get('find-task/:id')
    getTaskById(@Param('id') task_id: string) {
        return this.taskService.getTaskById(Number(task_id));
    }

    @Post('create-task')
    createTask(@Body() create_task_data: {}) {
        return this.taskService.createTask(create_task_data);
    }

    @Put('update-task')
    updateTask() {
        return this.taskService.updateTask();
    }

    @Delete('delete-task')
    deleteTask() {
        return this.taskService.deleteTask();
    }

    @Delete('delete-all-task')
    deleteAllTask() {
        return this.taskService.deleteAllTask();
    }
}
