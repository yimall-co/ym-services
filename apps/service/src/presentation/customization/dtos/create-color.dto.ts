import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum ColorValue {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    BACKGROUND = 'background',
    FOREGROUND = 'foreground',
}

export class CreateColorDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    label: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ColorValue)
    value: ColorValue;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isDefault: boolean;
}
