import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsOptional,
    IsPhoneNumber,
    IsString,
    IsUrl,
    IsUUID,
    MaxLength,
} from 'class-validator';

export class CreateShopDto {
    @ApiProperty()
    @IsString()
    @MaxLength(150)
    name: string;

    @ApiProperty()
    @IsOptional()
    @MaxLength(2000)
    description?: string;

    @ApiProperty()
    @IsOptional()
    @IsUrl()
    banner?: string;

    @ApiProperty()
    @IsPhoneNumber('CO')
    phone: string;

    @ApiProperty()
    @IsBoolean()
    isPrimary: boolean;

    @ApiProperty()
    @IsUUID('4')
    workspaceId: string;
}
