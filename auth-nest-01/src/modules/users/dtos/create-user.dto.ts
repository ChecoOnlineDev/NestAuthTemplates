import { IsEmail, IsString, MinLength } from 'class-validator';

//Sign Up dto (registar nuevo usuario)
export class CreateUserDto {
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}
