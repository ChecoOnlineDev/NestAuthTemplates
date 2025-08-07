import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

//localhost:3000/users
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    //Ruta para registrar usuarios
    @Post('sign-up')
    signUp(@Body() createUserData: CreateUserDto) {
        return this.userService.signUp(createUserData);
    }
}
