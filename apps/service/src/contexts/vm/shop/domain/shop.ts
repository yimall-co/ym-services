import { AggregateRoot } from 'shared/domain/aggregate-root';

import { ShopId } from 'vm/shared/domain/shop-id';
import { AddressId } from 'vm/shared/domain/address-id';

import { ShopName } from './value-object/shop-name';
import { ShopSlug } from './value-object/shop-slug';
import { ShopDescription } from './value-object/shop-description';
import { ShopBanner } from './value-object/shop-banner';
import { ShopPhone } from './value-object/shop-phone';
import { ShopIsPrimary } from './value-object/shop-is-primary';
import { ShopIsVerified } from './value-object/shop-is-verified';
import { ShopCreatedAt } from './value-object/shop-created-at';
import { ShopUpdatedAt } from './value-object/shop-updated-at';
import { ShopWorkspaceId } from './value-object/shop-workspace-id';

export interface ShopPrimitives {
    id: string;
    name: string;
    slug: string;
    description: string;
    banner: string;
    phone: string;
    isPrimary: boolean;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    workspaceId: string;
}

export class Shop extends AggregateRoot<ShopPrimitives> {
    private readonly id: ShopId;
    private name: ShopName;
    private slug: ShopSlug;
    private description: ShopDescription;
    private banner: ShopBanner;
    private phone: ShopPhone;
    private isPrimary: ShopIsPrimary;
    private isVerified: ShopIsVerified;
    private readonly createdAt: ShopCreatedAt;
    private updatedAt: ShopUpdatedAt;
    private workspaceId: ShopWorkspaceId;

    constructor(
        id: ShopId,
        name: ShopName,
        slug: ShopSlug,
        description: ShopDescription,
        banner: ShopBanner,
        phone: ShopPhone,
        isPrimary: ShopIsPrimary,
        isVerified: ShopIsVerified,
        createdAt: ShopCreatedAt,
        updatedAt: ShopUpdatedAt,
        workspaceId: ShopWorkspaceId,
    ) {
        super();

        this.id = id;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.banner = banner;
        this.phone = phone;
        this.isPrimary = isPrimary;
        this.isVerified = isVerified;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.workspaceId = workspaceId;
    }

    static create(
        name: string,
        description: string,
        banner: string,
        phone: string,
        isPrimary: boolean,
        workspaceId: string,
    ): Shop {
        return new Shop(
            ShopId.random(),
            new ShopName(name),
            ShopSlug.fromRaw(name),
            new ShopDescription(description),
            banner ? ShopBanner.some(banner) : ShopBanner.none(),
            new ShopPhone(phone),
            new ShopIsPrimary(isPrimary),
            new ShopIsVerified(false),
            new ShopCreatedAt(new Date()),
            new ShopUpdatedAt(new Date()),
            new ShopWorkspaceId(workspaceId),
        );
    }

    static fromPrimitives(primitives: ShopPrimitives): Shop {
        return new Shop(
            new ShopId(primitives.id),
            new ShopName(primitives.name),
            new ShopSlug(primitives.slug),
            new ShopDescription(primitives.description),
            primitives.banner ? ShopBanner.some(primitives.banner) : ShopBanner.none(),
            new ShopPhone(primitives.phone),
            new ShopIsPrimary(primitives.isPrimary),
            new ShopIsVerified(primitives.isVerified),
            new ShopCreatedAt(primitives.createdAt),
            new ShopUpdatedAt(primitives.updatedAt),
            new ShopWorkspaceId(primitives.workspaceId),
        );
    }

    getId(): ShopId {
        return this.id;
    }

    getSlug(): ShopSlug {
        return this.slug;
    }

    getIsPrimary(): ShopIsPrimary {
        return this.isPrimary;
    }

    unmarkAsPrimary(): void {
        this.isPrimary = new ShopIsPrimary(false);
    }

    toPrimitives(): ShopPrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            slug: this.slug.value,
            description: this.description.value,
            banner: this.banner.value,
            phone: this.phone.value,
            isPrimary: this.isPrimary.value,
            isVerified: this.isVerified.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            workspaceId: this.workspaceId.value,
        };
    }

    private touch(): void {
        this.updatedAt = new ShopUpdatedAt(new Date());
    }
}
