import { AggregateRoot } from 'shared/domain/aggregate-root';

import { WorkspaceId } from 'wm/shared/domain/workspace-id';
import { CustomizationId } from 'wm/shared/domain/customization-id';
import { CustomizationColorId } from 'wm/shared/domain/customization-color-id';

import { SocialMedia, SocialMediaPrimitives } from './social-media';
import { SocialMediaCollection } from './social-media-collection';
import { CustomizationLogo } from './value-object/customization-logo';
import { CustomizationFont, FontValue } from './value-object/customization-font';
import { CustomizationShowName } from './value-object/customization-show-name';
import { CustomizationCreatedAt } from './value-object/customization-created-at';
import { CustomizationUpdatedAt } from './value-object/customization-updated-at';

export interface CustomizationPrimitives {
    id: string;
    logo: string;
    fontPrimary: FontValue;
    fontSecondary: FontValue;
    showName: boolean;
    socialMedia: Array<SocialMediaPrimitives>;
    createdAt: Date;
    updatedAt: Date;
    workspaceId: string;
    colors: Array<string>;
}

export class Customization extends AggregateRoot<CustomizationPrimitives> {
    private readonly id: CustomizationId;
    private logo: CustomizationLogo;
    private fontPrimary: CustomizationFont;
    private fontSecondary: CustomizationFont;
    private showName: CustomizationShowName;
    private socialMedia: SocialMediaCollection;
    private readonly createdAt: CustomizationCreatedAt;
    private updatedAt: CustomizationUpdatedAt;
    private workspaceId: WorkspaceId;
    private colors: Array<CustomizationColorId>;

    constructor(
        id: CustomizationId,
        logo: CustomizationLogo,
        fontPrimary: CustomizationFont,
        fontSecondary: CustomizationFont,
        showName: CustomizationShowName,
        socialMedia: SocialMediaCollection,
        createdAt: CustomizationCreatedAt,
        updatedAt: CustomizationUpdatedAt,
        workspaceId: WorkspaceId,
        colors: Array<CustomizationColorId>,
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
        this.colors = colors;
    }

    static create(
        logo: CustomizationLogo,
        fontPrimary: CustomizationFont,
        fontSecondary: CustomizationFont,
        workspaceId: WorkspaceId,
        colors?: Array<CustomizationColorId>,
    ): Customization {
        return new Customization(
            CustomizationId.random(),
            logo,
            fontPrimary,
            fontSecondary,
            new CustomizationShowName(false),
            new SocialMediaCollection([]),
            new CustomizationCreatedAt(new Date()),
            new CustomizationUpdatedAt(new Date()),
            workspaceId,
            colors ?? [],
        );
    }

    static fromPrimitives(primitives: CustomizationPrimitives): Customization {
        return new Customization(
            new CustomizationId(primitives.id),
            new CustomizationLogo(primitives.logo),
            new CustomizationFont(primitives.fontPrimary),
            new CustomizationFont(primitives.fontSecondary),
            new CustomizationShowName(primitives.showName),
            new SocialMediaCollection(
                primitives.socialMedia.map((socialMedia) =>
                    SocialMedia.fromPrimitives(socialMedia),
                ),
            ),
            new CustomizationCreatedAt(primitives.createdAt),
            new CustomizationUpdatedAt(primitives.updatedAt),
            new WorkspaceId(primitives.workspaceId),
            primitives.colors.map((color) => new CustomizationColorId(color)),
        );
    }

    getId(): CustomizationId {
        return this.id;
    }

    getWorkspaceId(): WorkspaceId {
        return this.workspaceId;
    }

    getColors(): Array<CustomizationColorId> {
        return this.colors;
    }

    toPrimitives(): CustomizationPrimitives {
        return {
            id: this.id.value,
            logo: this.logo.value,
            fontPrimary: this.fontPrimary.value,
            fontSecondary: this.fontSecondary.value,
            showName: this.showName.value,
            socialMedia: this.socialMedia.value.map((socialMedia) => socialMedia.toPrimitives()),
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            workspaceId: this.workspaceId.value,
            colors: this.colors.map((color) => color.value),
        };
    }

    private touch(): void {
        this.updatedAt = new CustomizationUpdatedAt(new Date());
    }
}
