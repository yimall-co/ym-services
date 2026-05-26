import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

import {
    commentTargets,
    type CommentTarget,
} from 'core/social/comment/domain/enum/comment-targets';

export class CreateCommentDto {
    @ApiProperty()
    @IsString()
    @MaxLength(5000)
    @MinLength(1)
    content: string;

    @ApiProperty()
    @IsUUID('4')
    targetId: string;

    @ApiProperty()
    @IsEnum(commentTargets)
    targetType: CommentTarget;

    @ApiProperty()
    @IsUUID('4')
    userId: string;
}
