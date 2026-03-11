import { Provider, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { SegmentRepository } from 'wm/segment/domain/segment.repository';
import { DrizzleSegmentRepository } from 'wm/segment/infrastructure/persistence/drizzle-segment.repository';
import { CreateSegmentCommandHandler } from 'wm/segment/application/command/create/create-segment.command-handler';

import { DRIZZLE_INSTANCE } from 'presentation/shared/adapters/constants';

import { CREATE_SEGMENT_COMMAND_HANDLER, SEGMENT_REPOSITORY } from './constants';

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
