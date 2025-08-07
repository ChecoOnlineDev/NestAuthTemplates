import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
    providers: [TaskService],
    controllers: [TaskController],
    imports: [PrismaModule],
    exports: [TaskService],
})
export class TaskModule {}
