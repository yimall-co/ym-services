import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsStrongPassword,
    IsUrl,
    MaxLength,
    MinLength,
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
    @IsString()
    @MinLength(6)
    // @IsStrongPassword({
    //     minLength: 6,
    // })
    password: string;

    @ApiProperty()
    @IsOptional()
    @IsUrl()
    image?: string;
}
