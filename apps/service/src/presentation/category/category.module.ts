import { DynamicModule, Module } from '@nestjs/common';

import { CategoryController } from './category.controller';
import {
    categoryQueryRepositoryProvider,
    categoryRepositoryProvider,
    categoryUnitOfWorkProvider,
    createCategoryCommandHandlerProvider,
    getCategoriesByWorkspaceIdQueryHandlerProvider,
    getCategoryByIdQueryHandlerProvider,
    getCategoryBySlugQueryHandlerProvider,
} from './adapters';

@Module({
    controllers: [CategoryController],
    providers: [
        categoryUnitOfWorkProvider,
        categoryRepositoryProvider,
        categoryQueryRepositoryProvider,
        getCategoryByIdQueryHandlerProvider,
        getCategoryBySlugQueryHandlerProvider,
        getCategoriesByWorkspaceIdQueryHandlerProvider,
        createCategoryCommandHandlerProvider,
    ],
    exports: [
        getCategoryByIdQueryHandlerProvider,
        getCategoryBySlugQueryHandlerProvider,
        getCategoriesByWorkspaceIdQueryHandlerProvider,
        createCategoryCommandHandlerProvider,
    ],
})
export class CategoryModule {
    static forRoot(): DynamicModule {
        return {
            module: CategoryModule,
        };
    }
}
