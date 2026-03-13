export interface CategoryByIdDto {
    id: string;
    label: string;
    slug: string;
    description: string | null;
    banner: string | null;
    position: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    workspaceId: string;
}
