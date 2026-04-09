import { Provider, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { CategoryQueryRepository } from 'lm/category/application/query/category-query.repository';
import { GetCategoryBySlugQueryHandler } from 'lm/category/application/query/get-category-by-slug/handler';
import { DrizzleCategoryRepository } from 'lm/category/infrastructure/persistence/drizzle-category.repository';
import { DrizzleCategoryQueryRepository } from 'lm/category/infrastructure/persistence/drizzle-category-query.repository';
import { GetCategoryByIdQueryHandler } from 'lm/category/application/query/get-category-by-id/handler';
import { GetCategoriesByWorkspaceIdQueryHandler } from 'lm/category/application/query/get-categories-by-workspace-id/handler';
import { DrizzleCategoryUnitOfWork } from 'lm/category/infrastructure/persistence/drizzle-category.uow';
import { CreateCategoryCommandHandler } from 'lm/category/application/command/create-category/handler';

import { DRIZZLE_INSTANCE } from 'presentation/shared/adapters/constants';

import {
    CATEGORY_QUERY_REPOSITORY,
    CATEGORY_REPOSITORY,
    CATEGORY_UNIT_OF_WORK,
    CREATE_CATEGORY_COMMAND_HANDLER,
    GET_CATEGORIES_BY_WORKSPACE_ID_QUERY_HANDLER,
    GET_CATEGORY_BY_ID_QUERY_HANDLER,
    GET_CATEGORY_BY_SLUG_QUERY_HANDLER,
} from './constants';

import * as schema from 'shared/infrastructure/persistence/drizzle/schema';

export const categoryUnitOfWorkProvider: Provider = {
    provide: CATEGORY_UNIT_OF_WORK,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) =>
        new DrizzleCategoryUnitOfWork(database),
    scope: Scope.REQUEST,
};

export const categoryRepositoryProvider: Provider = {
    provide: CATEGORY_REPOSITORY,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) =>
        new DrizzleCategoryRepository(database),
    scope: Scope.REQUEST,
};

export const categoryQueryRepositoryProvider: Provider = {
    provide: CATEGORY_QUERY_REPOSITORY,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) =>
        new DrizzleCategoryQueryRepository(database),
    scope: Scope.REQUEST,
};

export const getCategoryByIdQueryHandlerProvider: Provider = {
    provide: GET_CATEGORY_BY_ID_QUERY_HANDLER,
    inject: [CATEGORY_QUERY_REPOSITORY],
    useFactory: (categoryQueryRepository: CategoryQueryRepository) =>
        new GetCategoryByIdQueryHandler(categoryQueryRepository),
    scope: Scope.DEFAULT,
};

export const getCategoryBySlugQueryHandlerProvider: Provider = {
    provide: GET_CATEGORY_BY_SLUG_QUERY_HANDLER,
    inject: [CATEGORY_QUERY_REPOSITORY],
    useFactory: (categoryQueryRepository: CategoryQueryRepository) =>
        new GetCategoryBySlugQueryHandler(categoryQueryRepository),
    scope: Scope.DEFAULT,
};

export const getCategoriesByWorkspaceIdQueryHandlerProvider: Provider = {
    provide: GET_CATEGORIES_BY_WORKSPACE_ID_QUERY_HANDLER,
    inject: [CATEGORY_QUERY_REPOSITORY],
    useFactory: (categoryQueryRepository: CategoryQueryRepository) =>
        new GetCategoriesByWorkspaceIdQueryHandler(categoryQueryRepository),
    scope: Scope.DEFAULT,
};

export const createCategoryCommandHandlerProvider: Provider = {
    provide: CREATE_CATEGORY_COMMAND_HANDLER,
    inject: [CATEGORY_UNIT_OF_WORK],
    useFactory: (categoryUnitOfWork: DrizzleCategoryUnitOfWork) =>
        new CreateCategoryCommandHandler(categoryUnitOfWork),
    scope: Scope.REQUEST,
};
