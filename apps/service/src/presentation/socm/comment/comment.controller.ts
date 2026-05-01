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
import { CommentateOnCommand } from 'socm/comment/application/command/commentate-on/command';
import { CommentateOnResultDto } from 'socm/comment/application/command/commentate-on/dto';

import { COMMAND_BUS, QUERY_BUS } from 'presentation/shared/adapters/constants';

import { CreateCommentDto } from './dtos/create-comment.dto';

@ApiTags('Comments')
@Controller({
    path: 'comments',
    version: '1',
})
@UseInterceptors(CacheInterceptor)
export class CommentController {
    private readonly logger = new Logger(CommentController.name);

    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
    ) { }

    @Post()
    @ApiCreatedResponse({ description: '' })
    @ApiBadRequestResponse({ description: '' })
    @HttpCode(HttpStatus.CREATED)
    async createComment(@Body() body: CreateCommentDto) {
        try {
            const { content, targetId, targetType, userId } = body;

            const command = new CommentateOnCommand(targetId, targetType, content, userId);
            return await this.commandBus.dispatch<CommentateOnResultDto>(command);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(error.message);
        }
    }
}
