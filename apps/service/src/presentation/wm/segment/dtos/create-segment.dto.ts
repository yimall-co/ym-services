import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSegmentDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    isActive: boolean = true;
}
