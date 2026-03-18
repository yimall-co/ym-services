import { Inject, Injectable } from '@nestjs/common';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { PaginatedSegment } from 'wm/segment/application/query/segment-query.repository';
import { SegmentByCriteriaDto } from 'wm/segment/application/query/get-segments-by-criteria/dto';
import { GetSegmentsByCriteriaQuery } from 'wm/segment/application/query/get-segments-by-criteria/query';
import { CreateSegmentCommand } from 'wm/segment/application/command/create-segment/command';

import { COMMAND_BUS, QUERY_BUS } from 'presentation/shared/adapters/constants';

import { CreateSegmentDto } from './dtos/create-segment.dto';
import { GetSegmentsByCriteriaDto } from './dtos/get-segments-by-criteria.dto';

@Injectable()
export class SegmentService {
    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
    ) { }

    async getAllSegments(dto: GetSegmentsByCriteriaDto) {
        const updatedAt = dto.updatedAt ? new Date(dto.updatedAt) : undefined;

        const query = new GetSegmentsByCriteriaQuery(dto.id, dto.limit, updatedAt);
        return await this.queryBus.ask<PaginatedSegment<Array<SegmentByCriteriaDto>>>(query);
    }

    async createSegment(dto: CreateSegmentDto) {
        const { name, description, isActive } = dto;

        const command = new CreateSegmentCommand(name, description, isActive);
        await this.commandBus.dispatch(command);
    }
}
