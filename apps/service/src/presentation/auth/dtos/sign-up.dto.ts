import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsStrongPassword,
    IsUrl,
    MaxLength,
} from 'class-validator';

export class SignUpDto {
    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(150)
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 6,
    })
    password: string;

    @ApiProperty()
    @IsOptional()
    @IsUrl()
    image: string;
}
