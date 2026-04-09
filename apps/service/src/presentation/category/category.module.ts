import { DynamicModule, Module } from '@nestjs/common';

import { CategoryController } from './category.controller';
import {
    categoryQueryRepositoryProvider,
    categoryRepositoryProvider,
    getCategoriesByWorkspaceIdQueryHandlerProvider,
    getCategoryByIdQueryHandlerProvider,
    getCategoryBySlugQueryHandlerProvider,
} from './adapters';

@Module({
    controllers: [CategoryController],
    providers: [
        categoryRepositoryProvider,
        categoryQueryRepositoryProvider,
        getCategoryByIdQueryHandlerProvider,
        getCategoryBySlugQueryHandlerProvider,
        getCategoriesByWorkspaceIdQueryHandlerProvider,
    ],
    exports: [
        getCategoryByIdQueryHandlerProvider,
        getCategoryBySlugQueryHandlerProvider,
        getCategoriesByWorkspaceIdQueryHandlerProvider,
    ],
})
export class CategoryModule {
    static forRoot(): DynamicModule {
        return {
            module: CategoryModule,
        };
    }
}
