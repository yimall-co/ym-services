import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { colorVariants, type ColorVariant } from 'wm/color/domain/enum/color-variants';

export class CreateColorDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    label: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(colorVariants)
    value: ColorVariant;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isDefault: boolean;
}
