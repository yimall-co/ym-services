import { IsDateString, IsNumber, IsOptional, IsPositive, IsUUID, Max, Min } from 'class-validator';

export class GetWorkspacesDto {
    @IsOptional()
    @IsUUID('4')
    id?: string;

    @IsOptional()
    @IsDateString()
    updatedAt?: string;

    @IsOptional()
    @IsNumber({ allowInfinity: false })
    @IsPositive()
    @Max(1000)
    @Min(1)
    limit?: number;
}
