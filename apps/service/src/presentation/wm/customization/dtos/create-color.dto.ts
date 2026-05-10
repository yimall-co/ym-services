import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { colorValues, type ColorValue } from 'wm/customization-color/domain/enum/color-values';

export class CreateColorDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    label: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(colorValues)
    value: ColorValue;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isDefault: boolean;
}
