export interface WorkspaceByIdDto {
    id: string;
    name: string;
    description: string | null;
    tin: string | null;
    segmentId: string;
    ownerId: string;
}
