export const geolocationTargets = {
    SHOP: 'shop',
    USER: 'user',
} as const;

export type GeolocationTarget = (typeof geolocationTargets)[keyof typeof geolocationTargets];