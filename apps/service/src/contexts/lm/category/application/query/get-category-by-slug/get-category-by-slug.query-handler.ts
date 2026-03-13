import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';

import { CategoryBySlugDto } from './get-category-by-slug.dto';
import { GetCategoryBySlugQuery } from './get-category-by-slug.query';
import { CategoryQueryRepository } from '../category-query.repository';

export class GetCategoryBySlugQueryHandler implements QueryHandler<
    GetCategoryBySlugQuery,
    CategoryBySlugDto
> {
    constructor(private readonly categoryQueryRepository: CategoryQueryRepository) { }

    subscribedTo(): Query {
        return GetCategoryBySlugQuery;
    }

    async handle(query: GetCategoryBySlugQuery): Promise<CategoryBySlugDto> {
        const category = await this.categoryQueryRepository.findBySlug(query.slug);
        if (!category) {
            throw new Error('Category by slug not found');
        }

        return category;
    }
}
