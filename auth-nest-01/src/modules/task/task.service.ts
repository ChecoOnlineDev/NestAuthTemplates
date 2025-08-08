import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { Task, TaskStatus } from 'generated/prisma';

@Injectable()
export class TaskService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllTasks(user_id: number): Promise<Task[]> {
        const tasks = await this.prisma.task.findMany({ where: { user_id } });
        if (!tasks.length) {
            throw new NotFoundException(
                'Actualmente no hay tareas registradas.',
            );
        }
        return tasks;
    }

    async getTaskById(user_id: number, task_id: number): Promise<Task> {
        const task = await this.prisma.task.findFirst({
            where: { task_id, user_id },
        });
        if (!task) {
            throw new NotFoundException('No se encontró la tarea solicitada.');
        }
        return task;
    }

    async createTask(user_id: number, dto: CreateTaskDto): Promise<Task> {
        return this.prisma.task.create({
            data: {
                user_id,
                task_title: dto.task_title,
                task_description: dto.task_description ?? null,
                task_status: dto.task_status ?? TaskStatus.PENDING,
                due_date: dto.due_date ? new Date(dto.due_date) : null,
            },
        });
    }

    async updateTask(
        user_id: number,
        task_id: number,
        dto: UpdateTaskDto,
    ): Promise<Task> {
        await this.getTaskById(user_id, task_id);
        return this.prisma.task.update({
            where: { task_id },
            data: {
                task_title: dto.task_title,
                task_description: dto.task_description,
                task_status: dto.task_status,
                due_date: dto.due_date ? new Date(dto.due_date) : undefined,
            },
        });
    }

    async deleteTask(
        user_id: number,
        task_id: number,
    ): Promise<{ message: string }> {
        await this.getTaskById(user_id, task_id);
        await this.prisma.task.delete({ where: { task_id } });
        return { message: 'Tarea eliminada exitosamente.' };
    }

    async deleteAllTasks(user_id: number): Promise<{ message: string }> {
        const result = await this.prisma.task.deleteMany({
            where: { user_id },
        });
        return {
            message: `Se eliminaron ${result.count} tareas.`,
        };
    }
}
