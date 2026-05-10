export const offerTypes = {
    PRODUCT: 'product',
    SERVICE: 'service',
} as const;

export type OfferTypes = (typeof offerTypes)[keyof typeof offerTypes];
