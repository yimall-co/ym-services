import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddRoleToUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    roleId: string;
}
