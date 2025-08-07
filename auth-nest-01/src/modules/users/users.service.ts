import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { hashPassword } from 'src/common/utils/bcrypt';
import { ResponseUserDto } from './dtos/response-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    //
    async signUp(createUserData: CreateUserDto): Promise<ResponseUserDto> {
        try {
            //Realizando 2 consultas simultaneamente
            const [user_by_username, user_by_email] = await Promise.all([
                this.prisma.user.findUnique({
                    where: { username: createUserData.username },
                }),
                this.prisma.user.findUnique({
                    where: { email: createUserData.email },
                }),
            ]);
            if (user_by_username) {
                throw new ConflictException('El nombre de usuario ya en uso.');
            }
            if (user_by_email) {
                throw new ConflictException('El email ya esta registrado.');
            }

            const hashedPassword = await hashPassword(createUserData.password); //Se debe agregar await para que la data lo acepte
            const user = await this.prisma.user.create({
                data: {
                    username: createUserData.username,
                    email: createUserData.email,
                    password: hashedPassword,
                },
            });
            const { password, ...user_whithout_password } = user;
            return user_whithout_password;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }

            throw new InternalServerErrorException(
                'Sucedio un error inesperado, intentelo mas tarde.',
            );
        }
    }


    async findByEmail(user_email: string){
        return await this.prisma.user.findUnique({
            where:{
                email : user_email
            }});
    }
}
