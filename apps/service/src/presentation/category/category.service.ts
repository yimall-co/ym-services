import { Inject, Injectable } from '@nestjs/common';

import type { QueryBus } from 'shared/domain/query-bus';
import type { CommandBus } from 'shared/domain/command-bus';
import { CategoryByIdDto } from 'lm/category/application/query/get-category-by-id/get-category-by-id.dto';
import { GetCategoryByIdQuery } from 'lm/category/application/query/get-category-by-id/get-category-by-id.query';
import { CategoryBySlugDto } from 'lm/category/application/query/get-category-by-slug/get-category-by-slug.dto';
import { GetCategoryBySlugQuery } from 'lm/category/application/query/get-category-by-slug/get-category-by-slug.query';
import { CategoryByWorkspaceIdDto } from 'lm/category/application/query/get-categories-by-workspace-id/get-categories-by-workspace-id.dto';
import { GetCategoriesByWorkspaceIdQuery } from 'lm/category/application/query/get-categories-by-workspace-id/get-categories-by-workspace-id.query';

import { COMMAND_BUS, QUERY_BUS } from 'presentation/shared/adapters/constants';

@Injectable()
export class CategoryService {
    constructor(
        @Inject(QUERY_BUS)
        private readonly queryBus: QueryBus,
        @Inject(COMMAND_BUS)
        private readonly commandBus: CommandBus,
    ) { }

    async getCategoryById(id: string) {
        const query = new GetCategoryByIdQuery(id);
        return await this.queryBus.ask<CategoryByIdDto>(query);
    }

    async getCategoryBySlug(slug: string) {
        const query = new GetCategoryBySlugQuery(slug);
        return await this.queryBus.ask<CategoryBySlugDto>(query);
    }

    async getCategoriesByWorkspaceId(workspaceId: string) {
        const query = new GetCategoriesByWorkspaceIdQuery(workspaceId);
        return await this.queryBus.ask<Array<CategoryByWorkspaceIdDto>>(query);
    }
}
