import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // elimina propiedades no definidas en el DTO
            forbidNonWhitelisted: true, // lanza error si se envían propiedades extra
            transform: true, // transforma payloads a instancias de clase
        }),
    );
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
