import { CacheInterceptor } from '@nestjs/cache-manager';
import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Inject,
    Logger,
    Post,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { LikeResultDto } from 'socm/reaction/application/command/like/dto';
import { LikeCommand } from 'socm/reaction/application/command/like/command';

import { COMMAND_BUS, QUERY_BUS } from 'presentation/shared/adapters/constants';

import { LikeDto } from './dtos/like.dto';

@ApiTags('Reactions')
@Controller({
    path: 'reactions',
    version: '1',
})
@UseInterceptors(CacheInterceptor)
export class ReactionController {
    private readonly logger = new Logger(ReactionController.name);

    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
    ) { }

    @Post('like')
    @ApiCreatedResponse({ description: '' })
    @ApiBadRequestResponse({ description: '' })
    @HttpCode(HttpStatus.CREATED)
    async like(@Body() body: LikeDto) {
        try {
            const { targetId, targetType, userId } = body;

            const command = new LikeCommand(targetId, targetType, userId);
            return await this.commandBus.dispatch<LikeResultDto>(command);
        } catch (error: any) {
            this.logger.error(error);
            throw new BadRequestException(error.message);
        }
    }
}
