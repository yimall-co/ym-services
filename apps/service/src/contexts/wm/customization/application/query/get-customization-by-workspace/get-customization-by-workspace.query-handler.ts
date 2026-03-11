import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';

import { CustomizationQueryRepository } from '../customization-query.repository';
import { CustomizationByWorkspaceDto } from './get-customization-by-workspace.dto';
import { GetCustomizationByWorkspaceQuery } from './get-customization-by-workspace.query';

export class GetCustomizationByWorkspaceQueryHandler implements QueryHandler<
    GetCustomizationByWorkspaceQuery,
    CustomizationByWorkspaceDto
> {
    constructor(private readonly customizationQueryRepository: CustomizationQueryRepository) { }

    subscribedTo(): Query {
        return GetCustomizationByWorkspaceQuery;
    }

    async handle(query: GetCustomizationByWorkspaceQuery): Promise<CustomizationByWorkspaceDto> {
        const customization = await this.customizationQueryRepository.findOneByWorkspace(
            query.workspaceId,
        );
        if (!customization) {
            throw new Error('Customization not found');
        }

        return customization;
    }
}
