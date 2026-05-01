import {
    IsDate,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    IsUUID,
    Max,
    Min,
} from 'class-validator';

export class GetSegmentsByCriteriaDto {
    @IsOptional()
    @IsString()
    @IsUUID('4')
    id?: string;

    @IsOptional()
    @IsNumber({ allowInfinity: false })
    @IsPositive()
    @Max(1000)
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsString()
    @IsDate()
    updatedAt?: string;
}
