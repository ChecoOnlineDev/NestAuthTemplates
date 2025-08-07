import { IsEmail, IsString } from 'class-validator';

//Inicar Sesion
export class LogInDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
