import { ApiProperty } from '@nestjs/swagger';
import {
    IsAlphanumeric,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
} from 'class-validator';

export class CreateWorkspaceDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(150)
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    description: string;

    @ApiProperty()
    @IsOptional()
    @IsAlphanumeric()
    tin?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID('4')
    segmentId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID('4')
    ownerId: string;
}
