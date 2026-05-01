import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUrl, IsUUID } from 'class-validator';

import { fontValue, type FontValue } from 'wm/customization/domain/value-object/customization-font';

export class CreateCustomizationDto {
    @ApiProperty()
    @IsUrl()
    logo: string;

    @ApiProperty()
    @IsEnum(fontValue)
    fontPrimary: FontValue;

    @ApiProperty()
    @IsEnum(fontValue)
    fontSecondary: FontValue;

    @ApiProperty()
    @IsUUID('4')
    workspaceId: string;
}
