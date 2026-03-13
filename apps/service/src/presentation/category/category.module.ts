import { DynamicModule, Module } from '@nestjs/common';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import {
    categoryQueryRepositoryProvider,
    categoryRepositoryProvider,
    getCategoryByIdQueryHandlerProvider,
    getCategoryBySlugQueryHandlerProvider,
} from './adapters';

@Module({
    controllers: [CategoryController],
    providers: [
        CategoryService,
        categoryRepositoryProvider,
        categoryQueryRepositoryProvider,
        getCategoryByIdQueryHandlerProvider,
        getCategoryBySlugQueryHandlerProvider,
    ],
    exports: [getCategoryByIdQueryHandlerProvider, getCategoryBySlugQueryHandlerProvider],
})
export class CategoryModule {
    static forRoot(): DynamicModule {
        return {
            module: CategoryModule,
        };
    }
}
