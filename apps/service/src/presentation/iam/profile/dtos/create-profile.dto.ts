import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProfileDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    gender?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    customGender?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    pronouns?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    customPronouns?: string;

    @ApiProperty()
    @IsDateString()
    birthdate: string;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    newsLetter?: boolean;

    @ApiProperty()
    @IsUUID('4')
    userId: string;
}
