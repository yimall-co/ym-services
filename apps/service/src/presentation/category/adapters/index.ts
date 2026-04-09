import { Provider, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { CategoryQueryRepository } from 'lm/category/application/query/category-query.repository';
import { GetCategoryBySlugQueryHandler } from 'lm/category/application/query/get-category-by-slug/handler';
import { DrizzleCategoryRepository } from 'lm/category/infrastructure/persistence/drizzle-category.repository';
import { DrizzleCategoryQueryRepository } from 'lm/category/infrastructure/persistence/drizzle-category-query.repository';
import { GetCategoryByIdQueryHandler } from 'lm/category/application/query/get-category-by-id/handler';
import { GetCategoriesByWorkspaceIdQueryHandler } from 'lm/category/application/query/get-categories-by-workspace-id/handler';

import { DRIZZLE_INSTANCE } from 'presentation/shared/adapters/constants';

import {
    CATEGORY_QUERY_REPOSITORY,
    CATEGORY_REPOSITORY,
    GET_CATEGORIES_BY_WORKSPACE_ID_QUERY_HANDLER,
    GET_CATEGORY_BY_ID_QUERY_HANDLER,
    GET_CATEGORY_BY_SLUG_QUERY_HANDLER,
} from './constants';

import * as schema from 'shared/infrastructure/persistence/drizzle/schema';

export const categoryRepositoryProvider: Provider = {
    provide: CATEGORY_REPOSITORY,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) =>
        new DrizzleCategoryRepository(database),
    scope: Scope.DEFAULT,
};

export const categoryQueryRepositoryProvider: Provider = {
    provide: CATEGORY_QUERY_REPOSITORY,
    inject: [DRIZZLE_INSTANCE],
    useFactory: (database: NodePgDatabase<typeof schema>) =>
        new DrizzleCategoryQueryRepository(database),
    scope: Scope.DEFAULT,
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
