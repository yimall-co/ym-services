import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsDateString,
    IsEnum,
    IsIP,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    IsUUID,
} from 'class-validator';

import { type SourceValue, sourceValue } from 'wm/visit/domain/value-object/visit-source';

export class VisitedDto {
    @ApiProperty()
    @IsOptional()
    @IsEnum(sourceValue)
    source?: SourceValue;

    @ApiProperty()
    @IsOptional()
    @IsString()
    userAgent?: string;

    @ApiProperty()
    @IsOptional()
    // TODO: check correctly IP comes from client
    // @IsIP('4')
    ipAddress?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    locale?: string;

    @ApiProperty()
    @IsOptional()
    @IsDateString()
    visitedAt?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @IsPositive()
    onboardingStepReached?: number;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    completeOnboarding?: boolean;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    isFirstVisit?: boolean;

    @ApiProperty()
    @IsOptional()
    @IsUUID()
    workspaceId?: string;

    @ApiProperty()
    @IsOptional()
    @IsUUID()
    visitorId?: string;
}
