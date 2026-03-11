export interface WorkspaceByIdDto {
    id: string;
    name: string;
    description: string | null;
    tin: string | null;
    segmentId: string;
    ownerId: string;
    owner: {
        id: string;
        name: string;
        email: string;
    };
    categories: {
        id: string;
        label: string;
    }[];
}
