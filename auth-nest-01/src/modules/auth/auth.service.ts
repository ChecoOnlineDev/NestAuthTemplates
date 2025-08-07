import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LogInDto } from './dtos/log-in.dto';
import { comparePasswords } from 'src/common/utils/bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ){}

    async logIn(log_in_data: LogInDto){
        try {
            //Si la busqueda fue correcta la constante user pasa a ser un objeto
            //que guarda toda la informacion del usuario asociado al email encontrado
            const user = await this.userService.findByEmail(log_in_data.email)
            if(!user){
                throw new UnauthorizedException('Credenciales Invalidas')
            }
            const isValidPassword = await comparePasswords(log_in_data.password, user.password)
            if(!isValidPassword){
                throw new UnauthorizedException('Credenciales Invalidas')
            }
            const payload = {
                user_id: user.user_id, 
                username: user.username,
                email: user.email
            }
            const token = this.jwtService.sign(payload)
            //destructuramos el objeto user para separar la password del email
            const {password, ...user_whithout_password} = user; 
            return {
                    access_token: token,
                    user: user_whithout_password,
                };

        } catch (error) {
            if(error instanceof Error){
                throw error
            }
            throw new InternalServerErrorException('Ocurrio un error inesperado, intentelo mas tarde.')
        }
    }
}
