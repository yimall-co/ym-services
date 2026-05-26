import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';

import { reactionTargets, type ReactionTargets } from 'core/social/reaction/domain/enum/reaction-targets';

export class LikeDto {
    @ApiProperty()
    @IsUUID('4')
    targetId: string;

    @ApiProperty()
    @IsEnum(reactionTargets)
    targetType: ReactionTargets;

    @ApiProperty()
    @IsUUID('4')
    userId: string;
}
