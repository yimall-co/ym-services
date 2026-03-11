import { CustomizationByWorkspaceDto } from './get-customization-by-workspace/get-customization-by-workspace.dto';

export interface CustomizationQueryRepository {
    findOneByWorkspace(workspaceId: string): Promise<CustomizationByWorkspaceDto>;
}
