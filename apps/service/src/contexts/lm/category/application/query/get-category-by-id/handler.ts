import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';

import { CategoryByIdDto } from './dto';
import { GetCategoryByIdQuery } from './query';
import { CategoryQueryRepository } from '../category-query.repository';

export class GetCategoryByIdQueryHandler implements QueryHandler<
    GetCategoryByIdQuery,
    CategoryByIdDto
> {
    constructor(private readonly categoryQueryRepository: CategoryQueryRepository) { }

    subscribedTo(): Query {
        return GetCategoryByIdQuery;
    }

    async handle(query: GetCategoryByIdQuery): Promise<CategoryByIdDto> {
        const category = await this.categoryQueryRepository.findById(query.id);
        if (!category) {
            throw new Error(`Category by id ${query.id} not found`);
        }

        return category;
    }
}
