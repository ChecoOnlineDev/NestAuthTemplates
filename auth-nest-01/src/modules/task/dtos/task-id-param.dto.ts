import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class TaskIdParamDto {
    @Type(() => Number)
    @IsInt()
    id: number;
}
