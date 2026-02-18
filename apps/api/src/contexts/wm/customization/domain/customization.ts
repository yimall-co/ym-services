import { AggregateRoot } from 'shared/domain/aggregate-root';

import { WorkspaceId } from 'wm/shared/domain/workspace-id';
import { CustomizationId } from 'wm/shared/domain/customization-id';

import { SocialMedia, SocialMediaPrimitives } from './social-media';
import { SocialMediaCollection } from './social-media-collection';
import { CustomizationLogo } from './value-object/customization-logo';
import { CustomizationFontPrimary } from './value-object/customization-font-primary';
import { CustomizationFontSecondary } from './value-object/customization-font-secondary';
import { CustomizationShowName } from './value-object/customization-show-name';
import { CustomizationCreatedAt } from './value-object/customization-created-at';
import { CustomizationUpdatedAt } from './value-object/customization-updated-at';

export interface CustomizationPrimitives {
    id: string;
    workspaceId: string;
    logo: string;
    fontPrimary: string;
    fontSecondary: string;
    showName: boolean;
    socialMedia: Array<SocialMediaPrimitives>;
    createdAt: Date;
    updatedAt: Date;
};

export class Customization extends AggregateRoot {
    readonly id: CustomizationId;
    readonly logo: CustomizationLogo;
    readonly fontPrimary: CustomizationFontPrimary;
    readonly fontSecondary: CustomizationFontSecondary;
    readonly showName: CustomizationShowName;
    readonly socialMedia: SocialMediaCollection;
    readonly createdAt: CustomizationCreatedAt;
    readonly updatedAt: CustomizationUpdatedAt;
    readonly workspaceId: WorkspaceId;

    constructor(
        id: CustomizationId,
        logo: CustomizationLogo,
        fontPrimary: CustomizationFontPrimary,
        fontSecondary: CustomizationFontSecondary,
        showName: CustomizationShowName,
        socialMedia: SocialMediaCollection,
        createdAt: CustomizationCreatedAt,
        updatedAt: CustomizationUpdatedAt,
        workspaceId: WorkspaceId,
    ) {
        super();

        this.id = id;
        this.logo = logo;
        this.fontPrimary = fontPrimary;
        this.fontSecondary = fontSecondary;
        this.showName = showName;
        this.socialMedia = socialMedia;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.workspaceId = workspaceId;
    }

    static fromPrimitives(primitives: CustomizationPrimitives): Customization {
        return new Customization(
            new CustomizationId(primitives.id),
            new CustomizationLogo(primitives.logo),
            new CustomizationFontPrimary(primitives.fontPrimary),
            new CustomizationFontSecondary(primitives.fontSecondary),
            new CustomizationShowName(primitives.showName),
            new SocialMediaCollection(primitives.socialMedia.map(SocialMedia.fromPrimitives)),
            new CustomizationCreatedAt(primitives.createdAt),
            new CustomizationUpdatedAt(primitives.updatedAt),
            new WorkspaceId(primitives.workspaceId),
        );
    }

    toPrimitives(): CustomizationPrimitives {
        return {
            id: this.id.value,
            logo: this.logo.value,
            fontPrimary: this.fontPrimary.value,
            fontSecondary: this.fontSecondary.value,
            showName: this.showName.value,
            socialMedia: this.socialMedia.value.map(
                (socialMedia) => socialMedia.toPrimitives()
            ),
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            workspaceId: this.workspaceId.value,
        };
    }
}