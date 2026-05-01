import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import {
    colorValue,
    type ColorValue,
} from 'wm/customization-color/domain/value-object/customization-color-value';

export class CreateColorDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    label: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(colorValue)
    value: ColorValue;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isDefault: boolean;
}
