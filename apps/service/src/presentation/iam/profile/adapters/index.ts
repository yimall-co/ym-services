import { Provider, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UnitOfWork } from 'shared/infrastructure/unit-of-work';
import { ProfileRepositoryScope } from 'iam/profiles/application/profile.repository-scope';
import { CreateProfileCommandHandler } from 'iam/profiles/application/command/create-profile/handler';
import { DrizzleProfileUnitOfWork } from 'iam/profiles/infrastructure/persistence/drizzle-profile.uow';

import { DRIZZLE_INSTANCE } from 'presentation/shared/adapters/constants';

import { CREATE_PROFILE_COMMAND_HANDLER, PROFILE_UNIT_OF_WORK } from './constants';

import * as schema from 'shared/infrastructure/persistence/drizzle/schema';

export const profileUnitOfWorkProvider: Provider = {
    provide: PROFILE_UNIT_OF_WORK,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) => new DrizzleProfileUnitOfWork(database),
    scope: Scope.REQUEST,
};

export const createProfileCommandHandlerProvider: Provider = {
    provide: CREATE_PROFILE_COMMAND_HANDLER,
    inject: [PROFILE_UNIT_OF_WORK],
    useFactory: (unitOfWork: UnitOfWork<ProfileRepositoryScope>) =>
        new CreateProfileCommandHandler(unitOfWork),
    scope: Scope.REQUEST,
};
