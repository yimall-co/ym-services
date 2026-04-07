import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Inject,
    Logger,
    Post,
    UnprocessableEntityException,
    UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiCreatedResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { CreateVisitResultDto } from 'wm/visit/application/command/create-visit/dto';
import { CreateVisitCommand } from 'wm/visit/application/command/create-visit/command';

import { Public } from 'presentation/shared/decorators/public-route.decorator';
import { QUERY_BUS, COMMAND_BUS } from 'presentation/shared/adapters/constants';

import { VisitedDto } from './dtos/visited.dto';

@Controller({
    path: 'tracking',
    version: '1',
})
@UseInterceptors(CacheInterceptor)
export class TrackingController {
    private readonly logger = new Logger(TrackingController.name);

    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
    ) { }

    @Post('visited')
    @Public()
    @Throttle({ default: { limit: 3, ttl: 5000 } })
    @ApiCreatedResponse({ description: '' })
    @ApiUnprocessableEntityResponse({ description: '' })
    @HttpCode(HttpStatus.CREATED)
    async visited(@Body() visitedDto: VisitedDto) {
        try {
            const {
                source,
                userAgent,
                ipAddress,
                locale,
                visitedAt,
                onboardingStepReached,
                completeOnboarding,
                isFirstVisit,
                workspaceId,
                visitorId,
            } = visitedDto;

            const command = new CreateVisitCommand(
                source,
                userAgent,
                ipAddress,
                locale,
                visitedAt ? new Date(visitedAt) : undefined,
                onboardingStepReached,
                completeOnboarding,
                isFirstVisit,
                workspaceId,
                visitorId,
            );
            return await this.commandBus.dispatch<CreateVisitResultDto>(command);
        } catch (error: any) {
            this.logger.error(error);
            throw new UnprocessableEntityException();
        }
    }
}
