import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUrl, IsUUID } from 'class-validator';

import { fonts, type Font } from 'wm/customization/domain/enum/fonts';

export class CreateCustomizationDto {
    @ApiProperty()
    @IsUrl()
    logo: string;

    @ApiProperty({ enum: fonts })
    @IsEnum(fonts)
    fontPrimary: Font;

    @ApiProperty({ enum: fonts })
    @IsEnum(fonts)
    fontSecondary: Font;

    @ApiProperty()
    @IsUUID('4')
    workspaceId: string;
}
