import { Uuid } from 'shared/domain/value-object/uuid';
import { CreatedAt } from 'shared/domain/value-object/created-at';
import { UpdatedAt } from 'shared/domain/value-object/updated-at';
import { AggregateRoot } from 'shared/domain/aggregate-root';

import { Font } from './enum/fonts';
import { SocialMedia, SocialMediaPrimitives } from './value-object/social-media';
import { SocialMediaCollection } from './value-object/social-media-collection';
import { CustomizationLogo } from './value-object/customization-logo';
import { CustomizationFont } from './value-object/customization-font';

export interface CustomizationPrimitives {
    id: string;
    logo: string;
    fontPrimary: Font;
    fontSecondary: Font;
    showName: boolean;
    socialMedia: Array<SocialMediaPrimitives>;
    createdAt: Date;
    updatedAt: Date;
    workspaceId: string;
    colors: Array<string>;
}

export class Customization extends AggregateRoot<CustomizationPrimitives> {
    private readonly id: Uuid;
    private logo: CustomizationLogo;
    private fontPrimary: CustomizationFont;
    private fontSecondary: CustomizationFont;
    private showName: boolean;
    private socialMedia: SocialMediaCollection;
    private readonly createdAt: CreatedAt;
    private updatedAt: UpdatedAt;
    private workspaceId: Uuid;
    private colors: Array<Uuid>;

    constructor(
        id: Uuid,
        logo: CustomizationLogo,
        fontPrimary: CustomizationFont,
        fontSecondary: CustomizationFont,
        showName: boolean,
        socialMedia: SocialMediaCollection,
        createdAt: CreatedAt,
        updatedAt: UpdatedAt,
        workspaceId: Uuid,
        colors: Array<Uuid>,
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
        workspaceId: Uuid,
        colors?: Array<Uuid>,
    ): Customization {
        return new Customization(
            Uuid.random(),
            logo,
            fontPrimary,
            fontSecondary,
            false,
            new SocialMediaCollection([]),
            CreatedAt.now(),
            UpdatedAt.now(),
            workspaceId,
            colors ?? [],
        );
    }

    static fromPrimitives(primitives: CustomizationPrimitives): Customization {
        return new Customization(
            new Uuid(primitives.id),
            new CustomizationLogo(primitives.logo),
            new CustomizationFont(primitives.fontPrimary),
            new CustomizationFont(primitives.fontSecondary),
            primitives.showName,
            new SocialMediaCollection(
                primitives.socialMedia.map((socialMedia) =>
                    SocialMedia.fromPrimitives(socialMedia),
                ),
            ),
            new CreatedAt(primitives.createdAt),
            new UpdatedAt(primitives.updatedAt),
            new Uuid(primitives.workspaceId),
            primitives.colors.map((color) => new Uuid(color)),
        );
    }

    getId(): Uuid {
        return this.id;
    }

    getWorkspaceId(): Uuid {
        return this.workspaceId;
    }

    getColors(): Array<Uuid> {
        return this.colors;
    }

    toPrimitives(): CustomizationPrimitives {
        return {
            id: this.id.value,
            logo: this.logo.value,
            fontPrimary: this.fontPrimary.value,
            fontSecondary: this.fontSecondary.value,
            showName: this.showName,
            socialMedia: this.socialMedia.value.map((socialMedia) => socialMedia.toPrimitives()),
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            workspaceId: this.workspaceId.value,
            colors: this.colors.map((color) => color.value),
        };
    }

    private touch(): void {
        this.updatedAt = UpdatedAt.now();
    }
}
