import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dtos/log-in.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    logIn(@Body() log_in_data: LogInDto){
        return this.authService.logIn(log_in_data)
    }
}
