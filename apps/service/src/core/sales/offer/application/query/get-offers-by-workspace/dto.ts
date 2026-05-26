export interface OfferByWorkspaceDto {
    id: string;
    title: string;
    description: string;
    banner: string;
    price: number;
    stock: number | null;
    discount: number;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
