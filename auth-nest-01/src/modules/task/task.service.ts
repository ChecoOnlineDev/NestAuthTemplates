import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {}

    async getAllTasks() {
        try {
            const all_tasks = await this.prisma.task.findMany();
            if (!all_tasks) {
                throw new NotFoundException(
                    'Actualmente no hay tareas registradas.',
                );
            }
            return all_tasks;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }

            throw new InternalServerErrorException(
                'Ocurrio un error al obtener las tareas, Intentelo mas tarde.',
            );
        }
    }

    async getTaskById(task_id: number) {
        try {
            const task_found = await this.prisma.task.findUnique({
                where: {
                    task_id: task_id,
                },
            });
            if (!task_found) {
                throw new NotFoundException(
                    'No se encontro la tarea solicitada.',
                );
            }
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }

            throw new InternalServerErrorException(
                'Ocurrio un error al obtener la tarea solicitada, Intentelo mas tarde',
            );
        }
    }

    createTask(create_task_data: any) {
        try {
        } catch (error) {}
    }

    updateTask() {}

    deleteTask() {}

    deleteAllTask() {}
}
