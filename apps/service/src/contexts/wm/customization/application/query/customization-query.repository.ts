import { CustomizationByIdDto } from './get-customization-by-id/get-customization-by-id.dto';
import { CustomizationByWorkspaceDto } from './get-customization-by-workspace/get-customization-by-workspace.dto';

export interface CustomizationQueryRepository {
    findOneById(id: string): Promise<CustomizationByIdDto | null>;
    findOneByWorkspace(workspaceId: string): Promise<CustomizationByWorkspaceDto>;
}
