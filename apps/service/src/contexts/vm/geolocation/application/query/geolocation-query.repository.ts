import { GeolocationByWorkspaceDto } from './get-geolocations-by-workspace/dto';

export interface GeolocationQueryRepository {
    findByWorkspace(workspaceId: string): Promise<Array<GeolocationByWorkspaceDto>>;
}
