import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    codeName: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(255)
    description?: string;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    permissions?: string[];
}
