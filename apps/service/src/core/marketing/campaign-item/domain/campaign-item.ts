import { Entity } from 'shared/domain/entity';

import { Url } from 'shared/domain/value-object/url';
import { Uuid } from 'shared/domain/value-object/uuid';
import { IsActive } from 'shared/domain/value-object/is-active';
import { CreatedAt } from 'shared/domain/value-object/created-at';
import { UpdatedAt } from 'shared/domain/value-object/updated-at';
import { OptionalUrl } from 'shared/domain/value-object/optional-url';

import { CampaignItemTitle } from './value-object/campaign-item-title';
import { CampaignItemSubtitle } from './value-object/campaign-item-subtitle';
import { CampaignItemDescription } from './value-object/campaign-item-description';
import { CampaignItemType, CampaignItemTypes } from './value-object/campaign-item-type';
import { CampaignItemBackgroundColor } from './value-object/campaign-item-background-color';
import { CampaignItemCallToAction } from './value-object/campaign-item-call-to-action';
import { CampaignItemPublicationPeriod } from './value-object/campaign-item-publication-period';
import { CampaignItemPriority } from './value-object/campaign-item-priority';
import {
    CampaignItemTargetType,
    CampaignItemTargetTypes,
} from './value-object/campaign-item-target-type';

export interface CampaignItemPrimitives {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    type: CampaignItemTypes;
    targetType: CampaignItemTargetTypes;
    targetId: string;
    imageUrl: string;
    mobileImageUrl: string;
    backgroundColor: string;
    callToAction: {
        text: string;
        url: string;
    };
    publicationPeriod: {
        startDate: Date;
        endDate: Date;
    };
    priority: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    campaignId: string;
}

export class CampaignItem extends Entity<CampaignItemPrimitives> {
    private readonly id: Uuid;
    private title: CampaignItemTitle;
    private subtitle: CampaignItemSubtitle;
    private description: CampaignItemDescription;
    private type: CampaignItemType;
    private targetType: CampaignItemTargetType;
    private targetId: Uuid;
    private imageUrl: Url;
    private mobileImageUrl: OptionalUrl;
    private backgroundColor: CampaignItemBackgroundColor;
    private callToAction: CampaignItemCallToAction;
    private publicationPeriod: CampaignItemPublicationPeriod;
    private priority: CampaignItemPriority;
    private isActive: IsActive;
    private createdAt: CreatedAt;
    private updatedAt: UpdatedAt;
    private campaignId: Uuid;

    constructor(
        id: Uuid,
        title: CampaignItemTitle,
        subtitle: CampaignItemSubtitle,
        description: CampaignItemDescription,
        type: CampaignItemType,
        targetType: CampaignItemTargetType,
        targetId: Uuid,
        imageUrl: Url,
        mobileImageUrl: OptionalUrl,
        backgroundColor: CampaignItemBackgroundColor,
        callToAction: CampaignItemCallToAction,
        publicationPeriod: CampaignItemPublicationPeriod,
        priority: CampaignItemPriority,
        isActive: IsActive,
        createdAt: CreatedAt,
        updatedAt: UpdatedAt,
        campaignId: Uuid,
    ) {
        super();

        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.type = type;
        this.targetType = targetType;
        this.targetId = targetId;
        this.imageUrl = imageUrl;
        this.mobileImageUrl = mobileImageUrl;
        this.backgroundColor = backgroundColor;
        this.callToAction = callToAction;
        this.publicationPeriod = publicationPeriod;
        this.priority = priority;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.campaignId = campaignId;
    }

    static fromPrimitives(primitives: CampaignItemPrimitives): CampaignItem {
        return new CampaignItem(
            new Uuid(primitives.id),
            new CampaignItemTitle(primitives.title),
            new CampaignItemSubtitle(primitives.subtitle),
            new CampaignItemDescription(primitives.description),
            new CampaignItemType(primitives.type),
            new CampaignItemTargetType(primitives.targetType),
            new Uuid(primitives.targetId),
            new Url(primitives.imageUrl),
            new OptionalUrl(primitives.mobileImageUrl),
            new CampaignItemBackgroundColor(primitives.backgroundColor),
            new CampaignItemCallToAction(primitives.callToAction.text, primitives.callToAction.url),
            new CampaignItemPublicationPeriod(
                primitives.publicationPeriod.startDate,
                primitives.publicationPeriod.endDate,
            ),
            new CampaignItemPriority(primitives.priority),
            new IsActive(primitives.isActive),
            new CreatedAt(primitives.createdAt),
            new UpdatedAt(primitives.updatedAt),
            new Uuid(primitives.campaignId),
        );
    }

    toPrimitives(): CampaignItemPrimitives {
        return {
            id: this.id.value,
            title: this.title.value,
            subtitle: this.subtitle.value,
            description: this.description.value,
            type: this.type.value,
            targetType: this.targetType.value,
            targetId: this.targetId.value,
            imageUrl: this.imageUrl.value,
            mobileImageUrl: this.mobileImageUrl.value,
            backgroundColor: this.backgroundColor.value,
            callToAction: {
                text: this.callToAction.text,
                url: this.callToAction.url,
            },
            publicationPeriod: {
                startDate: this.publicationPeriod.startDate,
                endDate: this.publicationPeriod.endDate,
            },
            priority: this.priority.value,
            isActive: this.isActive.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            campaignId: this.campaignId.value,
        };
    }
}
