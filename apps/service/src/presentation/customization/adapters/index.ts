import { Provider, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { CustomizationQueryRepository } from 'wm/customization/application/query/customization-query.repository';
import { CustomizationColorRepository } from 'wm/customization-color/domain/customization-color.repository';
import { DrizzleCustomizationRepository } from 'wm/customization/infrastructure/persistence/drizzle-customization.repository';
import { DrizzleCustomizationQueryRepository } from 'wm/customization/infrastructure/drizzle-customization-query.repository';
import { GetCustomizationByWorkspaceQueryHandler } from 'wm/customization/application/query/get-customization-by-workspace/get-customization-by-workspace.query-handler';
import { GetCustomizationByIdQueryHandler } from 'wm/customization/application/query/get-customization-by-id/get-customization-by-id.query-handler';
import { CreateCustomizationColorCommandHandler } from 'wm/customization-color/application/command/create/create-customization-color.command-handler';
import { DrizzleCustomizationColorRepository } from 'wm/customization-color/infrastructure/persistence/drizzle-customization-color.repository';

import { DRIZZLE_INSTANCE } from 'presentation/shared/adapters/constants';

import {
    CREATE_CUSTOMIZATION_COLOR_COMMAND_HANDLER,
    CUSTOMIZATION_COLOR_REPOSITORY,
    CUSTOMIZATION_QUERY_REPOSITORY,
    CUSTOMIZATION_REPOSITORY,
    GET_CUSTOMIZATION_BY_ID_QUERY_HANDLER,
    GET_CUSTOMIZATION_BY_WORKSPACE_QUERY_HANDLER,
} from './constants';

import * as schema from 'shared/infrastructure/persistence/drizzle/schema';

export const customizationRepositoryProvider: Provider = {
    provide: CUSTOMIZATION_REPOSITORY,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) =>
        new DrizzleCustomizationRepository(database),
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

export const createCustomizationColorCommandHandlerProvider: Provider = {
    provide: CREATE_CUSTOMIZATION_COLOR_COMMAND_HANDLER,
    inject: [CUSTOMIZATION_COLOR_REPOSITORY],
    useFactory: (customizationColorRepository: CustomizationColorRepository) =>
        new CreateCustomizationColorCommandHandler(customizationColorRepository),
    scope: Scope.DEFAULT,
};
