import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    emailOrUsername: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}
