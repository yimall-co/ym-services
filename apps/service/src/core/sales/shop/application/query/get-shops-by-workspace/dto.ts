export interface ShopByWorkspaceDto {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    banner: string | null;
    phone: string | null;
    isPrimary: boolean;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    // address: {
    //     id: string;
    // };
    geolocation: {
        id: string;
    };
    schedules: {
        id: string;
        dayOfWeek: number;
        isClosed: boolean;
    }[];
}
