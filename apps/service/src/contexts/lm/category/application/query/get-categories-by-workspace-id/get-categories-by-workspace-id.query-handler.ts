import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';

import { CategoryByWorkspaceIdDto } from './get-categories-by-workspace-id.dto';
import { GetCategoriesByWorkspaceIdQuery } from './get-categories-by-workspace-id.query';
import { CategoryQueryRepository } from '../category-query.repository';

export class GetCategoriesByWorkspaceIdQueryHandler implements QueryHandler<
    GetCategoriesByWorkspaceIdQuery,
    Array<CategoryByWorkspaceIdDto>
> {
    constructor(private readonly categoryQueryRepository: CategoryQueryRepository) { }

    subscribedTo(): Query {
        return GetCategoriesByWorkspaceIdQuery;
    }

    async handle(query: GetCategoriesByWorkspaceIdQuery): Promise<Array<CategoryByWorkspaceIdDto>> {
        const result = await this.categoryQueryRepository.findAllByWorkspaceId(query.workspaceId);
        return result;
    }
}
