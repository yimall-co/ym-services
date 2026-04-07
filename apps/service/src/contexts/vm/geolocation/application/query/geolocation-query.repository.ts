import { GeolocationByWorkspaceDto } from './get-geolocation-by-workspace/dto';

export interface GeolocationQueryRepository {
    findByWorkspace(workspaceId: string): Promise<Array<GeolocationByWorkspaceDto>>;
}
