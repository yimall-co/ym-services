export const socialPlatforms = {
    FACEBOOK: 'facebook',
    INSTAGRAM: 'instagram',
    TWITTER: 'twitter',
    LINKEDIN: 'linkedin',
    YOUTUBE: 'youtube',
    TIKTOK: 'tiktok',
    WHATSAPP: 'whatsapp',
    TELEGRAM: 'telegram',
} as const;

export type SocialPlatform = (typeof socialPlatforms)[keyof typeof socialPlatforms];
