import { Inject, Injectable } from '@nestjs/common';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { CreateSegmentCommand } from 'wm/segment/application/command/create/create-segment.command';

import { COMMAND_BUS, QUERY_BUS } from 'presentation/shared/adapters/constants';

import { CreateSegmentDto } from './dtos/create-segment.dto';

@Injectable()
export class SegmentService {
    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
    ) { }

    async getAllSegments() { }

    async createSegment(dto: CreateSegmentDto) {
        const { name, description, isActive } = dto;

        const command = new CreateSegmentCommand(name, description, isActive);
        await this.commandBus.dispatch(command);
    }
}
