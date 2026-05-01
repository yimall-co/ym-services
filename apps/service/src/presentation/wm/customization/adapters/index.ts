import { Provider, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { CustomizationQueryRepository } from 'wm/customization/application/query/customization-query.repository';
import { CustomizationColorRepository } from 'wm/customization-color/domain/customization-color.repository';
import { DrizzleCustomizationRepository } from 'wm/customization/infrastructure/persistence/drizzle-customization.repository';
import { DrizzleCustomizationQueryRepository } from 'wm/customization/infrastructure/persistence/drizzle-customization-query.repository';
import { GetCustomizationByWorkspaceQueryHandler } from 'wm/customization/application/query/get-customization-by-workspace/handler';
import { GetCustomizationByIdQueryHandler } from 'wm/customization/application/query/get-customization-by-id/handler';
import { CreateCustomizationColorCommandHandler } from 'wm/customization-color/application/command/create-customization-color/handler';
import { DrizzleCustomizationColorRepository } from 'wm/customization-color/infrastructure/persistence/drizzle-customization-color.repository';
import { CustomizationUnitOfWork } from 'wm/customization/infrastructure/persistence/customization.uow';
import { CreateCustomizationCommandHandler } from 'wm/customization/application/command/create-customization/handler';
import { CustomizationColorUnitOfWork } from 'wm/customization-color/infrastructure/persistence/customization-color.uow';

import { DRIZZLE_INSTANCE } from 'presentation/shared/adapters/constants';

import {
    CREATE_CUSTOMIZATION_COLOR_COMMAND_HANDLER,
    CREATE_CUSTOMIZATION_COMMAND_HANDLER,
    CUSTOMIZATION_COLOR_REPOSITORY,
    CUSTOMIZATION_COLOR_UNIT_OF_WORK,
    CUSTOMIZATION_QUERY_REPOSITORY,
    CUSTOMIZATION_UNIT_OF_WORK,
    GET_CUSTOMIZATION_BY_ID_QUERY_HANDLER,
    GET_CUSTOMIZATION_BY_WORKSPACE_QUERY_HANDLER,
} from './constants';

import * as schema from 'shared/infrastructure/persistence/drizzle/schema';

export const customizationUnitOfWorkProvider: Provider = {
    provide: CUSTOMIZATION_UNIT_OF_WORK,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) => new CustomizationUnitOfWork(database),
    scope: Scope.DEFAULT,
};

export const customizationColorUnitOfWorkProvider: Provider = {
    provide: CUSTOMIZATION_COLOR_UNIT_OF_WORK,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) =>
        new CustomizationColorUnitOfWork(database),
    scope: Scope.DEFAULT,
};

export const customizationQueryRepositoryProvider: Provider = {
    provide: CUSTOMIZATION_QUERY_REPOSITORY,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) =>
        new DrizzleCustomizationQueryRepository(database),
    scope: Scope.DEFAULT,
};

export const customizationColorRepositoryProvider: Provider = {
    provide: CUSTOMIZATION_COLOR_REPOSITORY,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) =>
        new DrizzleCustomizationColorRepository(database),
    scope: Scope.DEFAULT,
};

export const getCustomizationByIdQueryHandlerProvider: Provider = {
    provide: GET_CUSTOMIZATION_BY_ID_QUERY_HANDLER,
    inject: [CUSTOMIZATION_QUERY_REPOSITORY],
    useFactory: (customizationQueryRepository: CustomizationQueryRepository) =>
        new GetCustomizationByIdQueryHandler(customizationQueryRepository),
    scope: Scope.DEFAULT,
};

export const getCustomizationByWorkspaceQueryHandlerProvider: Provider = {
    provide: GET_CUSTOMIZATION_BY_WORKSPACE_QUERY_HANDLER,
    inject: [CUSTOMIZATION_QUERY_REPOSITORY],
    useFactory: (customizationQueryRepository: CustomizationQueryRepository) =>
        new GetCustomizationByWorkspaceQueryHandler(customizationQueryRepository),
    scope: Scope.DEFAULT,
};

export const createCustomizationCommandHandlerProvider: Provider = {
    provide: CREATE_CUSTOMIZATION_COMMAND_HANDLER,
    inject: [CUSTOMIZATION_UNIT_OF_WORK],
    useFactory: (customizationUnitOfWork: CustomizationUnitOfWork) =>
        new CreateCustomizationCommandHandler(customizationUnitOfWork),
    scope: Scope.REQUEST,
};

export const createCustomizationColorCommandHandlerProvider: Provider = {
    provide: CREATE_CUSTOMIZATION_COLOR_COMMAND_HANDLER,
    inject: [CUSTOMIZATION_COLOR_UNIT_OF_WORK],
    useFactory: (customizationColorUnitOfWork: CustomizationColorUnitOfWork) =>
        new CreateCustomizationColorCommandHandler(customizationColorUnitOfWork),
    scope: Scope.REQUEST,
};
