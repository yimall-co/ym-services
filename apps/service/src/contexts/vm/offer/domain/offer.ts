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
import { OfferIsRemoved } from './value-object/offer-is-removed';
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
    isRemoved: boolean;
    createdAt: Date;
    updatedAt: Date;
    categoryId: string;
    subcategoryId: string;
    shopId: string;
    workspaceId: string;
}

export class Offer extends AggregateRoot<OfferPrimitives> {
    private readonly id: OfferId;
    private type: OfferType;
    private schedulingType: OfferSchedulingType;
    private duration: OfferDuration;
    private title: OfferTitle;
    private slug: OfferSlug;
    private description: OfferDescription;
    private banner: OfferBanner;
    private price: OfferPrice;
    private stock: OfferStock;
    private discount: OfferDiscount;
    private startDate: OfferStartDate;
    private endDate: OfferEndDate;
    private isActive: OfferIsActive;
    private isRemoved: OfferIsRemoved;
    private readonly createdAt: OfferCreatedAt;
    private updatedAt: OfferUpdatedAt;
    private categoryId: OfferCategoryId;
    private subcategoryId: OfferSubCategoryId;
    private shopId: ShopId;
    private workspaceId: OfferWorkspaceId;

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
        isRemoved: OfferIsRemoved,
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
        this.isRemoved = isRemoved;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.categoryId = categoryId;
        this.subcategoryId = subcategoryId;
        this.shopId = shopId;
        this.workspaceId = workspaceId;
    }

    static create(
        type: OfferType,
        title: OfferTitle,
        slug: OfferSlug,
        description: OfferDescription,
        banner: OfferBanner,
        price: OfferPrice,
        stock: OfferStock,
        discount: OfferDiscount,
        startDate: OfferStartDate,
        endDate: OfferEndDate,
        categoryId: OfferCategoryId,
        subcategoryId: OfferSubCategoryId,
        workspaceId: OfferWorkspaceId,
    ): Offer {
        return new Offer(
            OfferId.random(),
            type,
            new OfferSchedulingType(SchedulingTypes.PROVIDER),
            new OfferDuration(0),
            title,
            slug,
            description,
            banner,
            price,
            stock,
            discount,
            startDate,
            endDate,
            new OfferIsActive(true),
            new OfferIsRemoved(false),
            new OfferCreatedAt(new Date()),
            new OfferUpdatedAt(new Date()),
            categoryId,
            subcategoryId,
            new ShopId(''),
            workspaceId,
        );
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
            new OfferIsRemoved(primitives.isRemoved),
            new OfferCreatedAt(primitives.createdAt),
            new OfferUpdatedAt(primitives.updatedAt),
            new OfferCategoryId(primitives.categoryId),
            new OfferSubCategoryId(primitives.subcategoryId),
            new ShopId(primitives.shopId),
            new OfferWorkspaceId(primitives.workspaceId),
        );
    }

    getId(): OfferId {
        return this.id;
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
            isRemoved: this.isRemoved.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            categoryId: this.categoryId.value,
            subcategoryId: this.subcategoryId.value,
            shopId: this.shopId.value,
            workspaceId: this.workspaceId.value,
        };
    }

    private touch(): void {
        this.updatedAt = new OfferUpdatedAt(new Date());
    }
}
