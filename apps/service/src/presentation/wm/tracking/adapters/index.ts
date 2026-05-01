import { Provider, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UnitOfWork } from 'shared/infrastructure/unit-of-work';
import { VisitRepositoryScope } from 'wm/visit/application/visit.repository-scope';
import { CreateVisitCommandHandler } from 'wm/visit/application/command/create-visit/handler';
import { DrizzleVisitUnitOfWork } from 'wm/visit/infrastructure/persistence/drizzle-visit.uow';

import { DRIZZLE_INSTANCE } from 'presentation/shared/adapters/constants';

import { CREATE_VISIT_COMMAND_HANDLER, VISIT_UNIT_OF_WORK } from './constants';

import * as schema from 'shared/infrastructure/persistence/drizzle/schema';

export const visitUnitOfWorkProvider: Provider = {
    provide: VISIT_UNIT_OF_WORK,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) => new DrizzleVisitUnitOfWork(database),
    scope: Scope.REQUEST,
};

export const createVisitCommandHandlerProvider: Provider = {
    provide: CREATE_VISIT_COMMAND_HANDLER,
    inject: [VISIT_UNIT_OF_WORK],
    useFactory: (visitUnitOfWork: UnitOfWork<VisitRepositoryScope>) =>
        new CreateVisitCommandHandler(visitUnitOfWork),
    scope: Scope.REQUEST,
};
