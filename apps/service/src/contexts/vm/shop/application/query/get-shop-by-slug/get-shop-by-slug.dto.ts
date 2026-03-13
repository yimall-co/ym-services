export interface ShopBySlugDto {
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
    address: {
        id: string;
        street: string;
        number: string;
        complement: string;
        neighborhood: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
        isOnline: boolean;
    };
    geolocation: {
        id: string;
        latitude: number;
        longitude: number;
        accuracy: number;
    };
    schedules: {
        id: string;
        dayOfWeek: number;
        isClosed: boolean;
    }[];
}
