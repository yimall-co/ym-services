import { Uuid } from 'shared/domain/value-object/uuid';
import { CreatedAt } from 'shared/domain/value-object/created-at';
import { UpdatedAt } from 'shared/domain/value-object/updated-at';
import { AggregateRoot } from 'shared/domain/aggregate-root';

import { offerTypes, OfferTypes } from './enum/offer-types';
import { schedulingTypes, SchedulingTypes } from './enum/scheduling-types';
import { OfferType } from './value-object/offer-type';
import { OfferSchedulingType } from './value-object/offer-scheduling-type';
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
    workspaceId: string;
}

export class Offer extends AggregateRoot<OfferPrimitives> {
    private readonly id: Uuid;
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
    private isActive: boolean;
    private isRemoved: boolean;
    private readonly createdAt: CreatedAt;
    private updatedAt: UpdatedAt;
    private categoryId: Uuid;
    private subcategoryId: Uuid;
    private workspaceId: Uuid;

    constructor(
        id: Uuid,
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
        isActive: boolean,
        isRemoved: boolean,
        createdAt: CreatedAt,
        updatedAt: UpdatedAt,
        categoryId: Uuid,
        subcategoryId: Uuid,
        workspaceId: Uuid,
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
        categoryId: Uuid,
        subcategoryId: Uuid,
        workspaceId: Uuid,
    ): Offer {
        return new Offer(
            Uuid.random(),
            type,
            new OfferSchedulingType(schedulingTypes.PROVIDER),
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
            true,
            false,
            CreatedAt.now(),
            UpdatedAt.now(),
            categoryId,
            subcategoryId,
            workspaceId,
        );
    }

    static fromPrimitives(primitives: OfferPrimitives): Offer {
        return new Offer(
            new Uuid(primitives.id),
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
            primitives.isActive,
            primitives.isRemoved,
            new CreatedAt(primitives.createdAt),
            new UpdatedAt(primitives.updatedAt),
            new Uuid(primitives.categoryId),
            new Uuid(primitives.subcategoryId),
            new Uuid(primitives.workspaceId),
        );
    }

    getId(): Uuid {
        return this.id;
    }

    getType(): OfferType {
        return this.type;
    }

    getSchedulingType(): OfferSchedulingType {
        return this.schedulingType;
    }

    getDuration(): OfferDuration {
        return this.duration;
    }

    getTitle(): OfferTitle {
        return this.title;
    }

    getSlug(): OfferSlug {
        return this.slug;
    }

    getDescription(): OfferDescription {
        return this.description;
    }

    getBanner(): OfferBanner {
        return this.banner;
    }

    getPrice(): OfferPrice {
        return this.price;
    }

    getStock(): OfferStock {
        return this.stock;
    }

    getDiscount(): OfferDiscount {
        return this.discount;
    }

    getStartDate(): OfferStartDate {
        return this.startDate;
    }

    getEndDate(): OfferEndDate {
        return this.endDate;
    }

    getIsActive(): boolean {
        return this.isActive;
    }

    getIsRemoved(): boolean {
        return this.isRemoved;
    }

    getCreatedAt(): CreatedAt {
        return this.createdAt;
    }

    getUpdatedAt(): UpdatedAt {
        return this.updatedAt;
    }

    getCategoryId(): Uuid {
        return this.categoryId;
    }

    getSubcategoryId(): Uuid {
        return this.subcategoryId;
    }

    getWorkspaceId(): Uuid {
        return this.workspaceId;
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
            isActive: this.isActive,
            isRemoved: this.isRemoved,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            categoryId: this.categoryId.value,
            subcategoryId: this.subcategoryId.value,
            workspaceId: this.workspaceId.value,
        };
    }

    private touch(): void {
        this.updatedAt = UpdatedAt.now();
    }
}
