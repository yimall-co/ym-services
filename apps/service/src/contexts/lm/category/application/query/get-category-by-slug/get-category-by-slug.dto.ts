export interface CategoryBySlugDto {
    id: string;
    label: string;
    slug: string;
    description: string | null;
    banner: string | null;
    position: number;
    createdAt: Date;
    updatedAt: Date;
    workspaceId: string;
    subcategories: Array<{
        id: string;
        label: string;
        slug: string;
        description: string | null;
        position: number;
    }>;
}
