import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddPermissionToRoleDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    permissionId: string;
}
