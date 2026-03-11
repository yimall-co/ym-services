import { SocialMediaPrimitives } from 'wm/customization/domain/social-media';

export interface Color {
    id: string;
    label: string;
    value: string;
    isDefault: boolean;
}

export interface CustomizationByWorkspaceDto {
    id: string;
    logo: string;
    fontPrimary: string;
    fontSecondary: string;
    showName: boolean;
    socialMedia: Array<SocialMediaPrimitives>;
    createdAt: Date;
    updatedAt: Date;
    workspaceId: string;
    colors: Array<Color>;
}
