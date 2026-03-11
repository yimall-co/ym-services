import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsStrongPassword } from 'class-validator';

export class SignUpDto {
    @ApiProperty()
    @IsNotEmpty()
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
    image: string;
}
