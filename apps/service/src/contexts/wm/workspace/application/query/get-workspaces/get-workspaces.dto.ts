export interface WorkspaceDto {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    tin: string | null;
    isVerified: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    segmentId: string;
    ownerId: string;
    owner: {
        name: string;
    };
    segment: {
        name: string;
    };
}
