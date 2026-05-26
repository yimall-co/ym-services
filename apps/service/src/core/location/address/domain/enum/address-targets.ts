export const addressTargets = {
    SHOP: 'shop',
    USER: 'user',
} as const;

export type AddressTarget = (typeof addressTargets)[keyof typeof addressTargets];
