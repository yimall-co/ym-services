import { ApiProperty } from '@nestjs/swagger';
import {
    IsDate,
    IsEnum,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    IsUrl,
    IsUUID,
    Max,
} from 'class-validator';

import { OfferTypes } from 'vm/offer/domain/value-object/offer-type';

export class CreateOfferDto {
    @ApiProperty()
    @IsEnum(OfferTypes)
    type: OfferTypes;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    @Max(2500)
    @IsOptional()
    description: string | null;

    @ApiProperty()
    @IsString()
    @IsUrl()
    banner: string;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    price: number;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    stock: number;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    @Max(100)
    discount: number;

    @ApiProperty()
    @IsDate()
    @IsOptional()
    startDate: string | null;

    @ApiProperty()
    @IsDate()
    @IsOptional()
    endDate: string | null;

    @ApiProperty()
    @IsString()
    @IsUUID()
    categoryId: string;

    @ApiProperty()
    @IsString()
    @IsUUID()
    @IsOptional()
    subcategoryId: string | null;

    @ApiProperty()
    @IsString()
    @IsUUID()
    workspaceId: string;
}
