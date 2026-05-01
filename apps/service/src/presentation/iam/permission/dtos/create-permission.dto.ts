import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePermissionDto {
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
    @IsBoolean()
    isActive?: boolean;
}
