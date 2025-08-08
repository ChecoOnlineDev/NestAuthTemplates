import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dtos/log-in.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    logIn(@Body() log_in_data: LogInDto) {
        return this.authService.logIn(log_in_data);
    }

    @UseGuards(JwtAuthGuard)
    @Get('myProfile')
    getMyProfile(@Req() req) {
        return req.user;
    }
}
