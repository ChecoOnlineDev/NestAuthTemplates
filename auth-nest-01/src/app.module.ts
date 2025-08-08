import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TaskModule } from './modules/task/task.module';

@Module({
    imports: [UsersModule, AuthModule, TaskModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
