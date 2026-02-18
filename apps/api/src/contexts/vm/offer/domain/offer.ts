import { AggregateRoot } from 'shared/domain/aggregate-root';

import { OfferId } from 'vm/shared/domain/offer-id';
import { ShopId } from 'vm/shared/domain/shop-id';

import { OfferType, OfferTypes } from './value-object/offer-type';
import { OfferSchedulingType, SchedulingTypes } from './value-object/offer-scheduling-type';
import { OfferTitle } from './value-object/offer-title';
import { OfferSlug } from './value-object/offer-slug';
import { OfferDescription } from './value-object/offer-description';
import { OfferDuration } from './value-object/offer-duration';
import { OfferBanner } from './value-object/offer-banner';
import { OfferPrice } from './value-object/offer-price';
import { OfferStock } from './value-object/offer-stock';
import { OfferDiscount } from './value-object/offer-discount';
import { OfferStartDate } from './value-object/offer-start-date';
import { OfferEndDate } from './value-object/offer-end-date';
import { OfferIsActive } from './value-object/offer-is-active';
import { OfferCreatedAt } from './value-object/offer-created-at';
import { OfferUpdatedAt } from './value-object/offer-updated-at';
import { OfferCategoryId } from './value-object/offer-category-id';
import { OfferSubCategoryId } from './value-object/offer-subcategory-id';
import { OfferWorkspaceId } from './value-object/offer-workspace-id';

export interface OfferPrimitives {
    id: string;
    type: OfferTypes;
    schedulingType: SchedulingTypes;
    duration: number;
    title: string;
    slug: string;
    description: string;
    banner: string;
    price: number;
    stock: number;
    discount: number;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    categoryId: string;
    subcategoryId: string;
    shopId: string;
    workspaceId: string;
}

export class Offer extends AggregateRoot {
    readonly id: OfferId;
    readonly type: OfferType;
    readonly schedulingType: OfferSchedulingType;
    readonly duration: OfferDuration;
    readonly title: OfferTitle;
    readonly slug: OfferSlug;
    readonly description: OfferDescription;
    readonly banner: OfferBanner;
    readonly price: OfferPrice;
    readonly stock: OfferStock;
    readonly discount: OfferDiscount;
    readonly startDate: OfferStartDate;
    readonly endDate: OfferEndDate;
    readonly isActive: OfferIsActive;
    readonly createdAt: OfferCreatedAt;
    readonly updatedAt: OfferUpdatedAt;
    readonly categoryId: OfferCategoryId;
    readonly subcategoryId: OfferSubCategoryId;
    readonly shopId: ShopId;
    readonly workspaceId: OfferWorkspaceId;

    constructor(
        id: OfferId,
        type: OfferType,
        schedulingType: OfferSchedulingType,
        duration: OfferDuration,
        title: OfferTitle,
        slug: OfferSlug,
        description: OfferDescription,
        banner: OfferBanner,
        price: OfferPrice,
        stock: OfferStock,
        discount: OfferDiscount,
        startDate: OfferStartDate,
        endDate: OfferEndDate,
        isActive: OfferIsActive,
        createdAt: OfferCreatedAt,
        updatedAt: OfferUpdatedAt,
        categoryId: OfferCategoryId,
        subcategoryId: OfferSubCategoryId,
        shopId: ShopId,
        workspaceId: OfferWorkspaceId,
    ) {
        super();

        this.id = id;
        this.type = type;
        this.schedulingType = schedulingType;
        this.duration = duration;
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.banner = banner;
        this.price = price;
        this.stock = stock;
        this.discount = discount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.categoryId = categoryId;
        this.subcategoryId = subcategoryId;
        this.shopId = shopId;
        this.workspaceId = workspaceId;
    }

    static fromPrimitives(primitives: OfferPrimitives): Offer {
        return new Offer(
            new OfferId(primitives.id),
            new OfferType(primitives.type),
            new OfferSchedulingType(primitives.schedulingType),
            new OfferDuration(primitives.duration),
            new OfferTitle(primitives.title),
            new OfferSlug(primitives.slug),
            new OfferDescription(primitives.description),
            new OfferBanner(primitives.banner),
            new OfferPrice(primitives.price),
            new OfferStock(primitives.stock),
            new OfferDiscount(primitives.discount),
            new OfferStartDate(primitives.startDate),
            new OfferEndDate(primitives.endDate),
            new OfferIsActive(primitives.isActive),
            new OfferCreatedAt(primitives.createdAt),
            new OfferUpdatedAt(primitives.updatedAt),
            new OfferCategoryId(primitives.categoryId),
            new OfferSubCategoryId(primitives.subcategoryId),
            new ShopId(primitives.shopId),
            new OfferWorkspaceId(primitives.workspaceId),
        );
    }

    toPrimitives(): OfferPrimitives {
        return {
            id: this.id.value,
            type: this.type.value,
            schedulingType: this.schedulingType.value,
            duration: this.duration.value,
            title: this.title.value,
            slug: this.slug.value,
            description: this.description.value,
            banner: this.banner.value,
            price: this.price.value,
            stock: this.stock.value,
            discount: this.discount.value,
            startDate: this.startDate.value,
            endDate: this.endDate.value,
            isActive: this.isActive.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            categoryId: this.categoryId.value,
            subcategoryId: this.subcategoryId.value,
            shopId: this.shopId.value,
            workspaceId: this.workspaceId.value,
        };
    }
}