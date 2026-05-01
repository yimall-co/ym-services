import { Provider, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { SegmentRepository } from 'wm/segment/domain/segment.repository';
import { SegmentQueryRepository } from 'wm/segment/application/query/segment-query.repository';
import { DrizzleSegmentRepository } from 'wm/segment/infrastructure/persistence/drizzle-segment.repository';
import { DrizzleSegmentQueryRepository } from 'wm/segment/infrastructure/drizzle-segment-query.repository';
import { CreateSegmentCommandHandler } from 'wm/segment/application/command/create-segment/handler';
import { GetSegmentsByCriteriaQueryHandler } from 'wm/segment/application/query/get-segments-by-criteria/handler';

import { DRIZZLE_INSTANCE } from 'presentation/shared/adapters/constants';

import {
    CREATE_SEGMENT_COMMAND_HANDLER,
    GET_SEGMENTS_BY_CRITERIA_QUERY_HANDLER,
    SEGMENT_QUERY_REPOSITORY,
    SEGMENT_REPOSITORY,
} from './constants';

import * as schema from 'shared/infrastructure/persistence/drizzle/schema';

export const segmentRepositoryProvider: Provider = {
    provide: SEGMENT_REPOSITORY,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) => new DrizzleSegmentRepository(database),
    scope: Scope.DEFAULT,
};

export const createSegmentCommandHandlerProvider: Provider = {
    provide: CREATE_SEGMENT_COMMAND_HANDLER,
    inject: [SEGMENT_REPOSITORY],
    useFactory: (segmentRepository: SegmentRepository) =>
        new CreateSegmentCommandHandler(segmentRepository),
    scope: Scope.DEFAULT,
};

export const segmentQueryRepositoryProvider: Provider = {
    provide: SEGMENT_QUERY_REPOSITORY,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) =>
        new DrizzleSegmentQueryRepository(database),
    scope: Scope.DEFAULT,
};

export const getSegmentsByCriteriaQueryHandlerProvider: Provider = {
    provide: GET_SEGMENTS_BY_CRITERIA_QUERY_HANDLER,
    inject: [SEGMENT_QUERY_REPOSITORY],
    useFactory: (segmentQueryRepository: SegmentQueryRepository) =>
        new GetSegmentsByCriteriaQueryHandler(segmentQueryRepository),
    scope: Scope.DEFAULT,
};
