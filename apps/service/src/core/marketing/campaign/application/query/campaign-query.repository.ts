import { CampaignByWorkspaceDto } from './get-campaign-by-workspace/dto';

export interface CampaignQueryRepository {
    findAllByWorkspace(workspaceId: string): Promise<Array<CampaignByWorkspaceDto>>;
}
