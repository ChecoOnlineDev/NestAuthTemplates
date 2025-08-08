import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (_: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.user;
    },
);

//A continuacion una explicacion de que hace este decorador:
/*
Este decorador `CurrentUser` se utiliza para extraer el usuario actual de la solicitud HTTP en un contexto de ejecución de NestJS.
Cuando se aplica a un parámetro de un controlador, permite acceder al objeto `user` que ha sido adjuntado a la solicitud por un guardia de autenticación, como `JwtAuthGuard`.
Esto es útil para obtener información del usuario autenticado sin necesidad de acceder directamente al objeto de solicitud en cada método del controlador.
Por ejemplo, se puede usar en un controlador de perfil para obtener el usuario autenticado y devolver su información de perfil. 
*/
