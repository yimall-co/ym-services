import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    IsUUID,
    MaxLength,
} from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty()
    @IsString()
    @MaxLength(50)
    label: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;

    @ApiProperty()
    @IsOptional()
    @IsUrl()
    banner?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    position?: number = 0;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    isActive?: boolean = true;

    @ApiProperty()
    @IsUUID('4')
    workspaceId: string;
}
