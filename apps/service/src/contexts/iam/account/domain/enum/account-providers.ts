export const accountProviders = {
    CREDENTIAL: 'credential',
    GOOGLE: 'google',
    FACEBOOK: 'facebook',
    TWITTER: 'twitter',
    APPLE: 'apple',
    TIKTOK: 'tiktok',
} as const;

export type AccountProviders = (typeof accountProviders)[keyof typeof accountProviders];
