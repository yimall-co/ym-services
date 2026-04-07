export interface GeolocationByWorkspaceDto {
    id: string;
    latitude: number;
    longitude: number;
    accuracy: number | null;
    shopId: string;
}
