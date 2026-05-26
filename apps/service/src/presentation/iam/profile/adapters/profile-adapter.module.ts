import { Module, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { CreateProfileCommandHandler } from 'core/iam/profiles/application/command/create-profile/handler';
import { DrizzleProfileUnitOfWork } from 'core/iam/profiles/infrastructure/persistence/drizzle-profile.uow';

import { DRIZZLE_INSTANCE } from 'src/common/adapters/constants';

import { CREATE_PROFILE_COMMAND_HANDLER, PROFILE_UNIT_OF_WORK } from './constants';

@Module({
    imports: [],
    providers: [
        {
            provide: PROFILE_UNIT_OF_WORK,
            inject: [DRIZZLE_INSTANCE],
            useFactory: (database: NodePgDatabase<Schema>) =>
                new DrizzleProfileUnitOfWork(database),
            scope: Scope.REQUEST,
        },
        {
            provide: CREATE_PROFILE_COMMAND_HANDLER,
            inject: [PROFILE_UNIT_OF_WORK],
            useFactory: (profileUnitOfWork: DrizzleProfileUnitOfWork) =>
                new CreateProfileCommandHandler(profileUnitOfWork),
            scope: Scope.REQUEST,
        },
    ],
    exports: [PROFILE_UNIT_OF_WORK, CREATE_PROFILE_COMMAND_HANDLER],
})
export class ProfileAdapterModule { }
