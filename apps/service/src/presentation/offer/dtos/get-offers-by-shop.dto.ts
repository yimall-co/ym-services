import { IsDate, IsNumber, IsPositive, IsString, IsUUID, Max, Min } from 'class-validator';

export class GetOffersByShopDto {
    @IsString()
    @IsUUID('4')
    id: string;

    @IsString()
    @IsUUID('4')
    shopId: string;

    @IsNumber({ allowInfinity: false })
    @IsPositive()
    @Max(1000)
    @Min(1)
    limit: number;

    @IsString()
    @IsDate()
    updatedAt: string;
}
