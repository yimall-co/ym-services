import { Query } from 'shared/domain/query';
import { QueryHandler } from 'shared/domain/query-handler';

import { CampaignByWorkspaceDto } from './dto';
import { GetCampaignByWorkspaceQuery } from './query';
import { CampaignQueryRepository } from '../campaign-query.repository';

export class GetCampaignByWorkspaceQueryHandler implements QueryHandler<
    GetCampaignByWorkspaceQuery,
    Array<CampaignByWorkspaceDto>
> {
    constructor(private readonly campaignQueryRepository: CampaignQueryRepository) { }

    subscribedTo(): Query {
        return GetCampaignByWorkspaceQuery;
    }

    async handle(query: GetCampaignByWorkspaceQuery): Promise<CampaignByWorkspaceDto[]> {
        const campaigns = await this.campaignQueryRepository.findAllByWorkspace(query.workspaceId);
        return campaigns;
    }
}
