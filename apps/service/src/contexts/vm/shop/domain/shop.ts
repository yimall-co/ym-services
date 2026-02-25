import { AggregateRoot } from 'shared/domain/aggregate-root';

import { ShopId } from 'vm/shared/domain/shop-id';
import { AddressId } from 'vm/shared/domain/address-id';
import { GeolocationId } from 'vm/shared/domain/geolocation-id';

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
    addressId: string;
    geolocationId: string;
    workspaceId: string;
}

export class Shop extends AggregateRoot {
    readonly id: ShopId;
    readonly name: ShopName;
    readonly slug: ShopSlug;
    readonly description: ShopDescription;
    readonly banner: ShopBanner;
    readonly phone: ShopPhone;
    readonly isPrimary: ShopIsPrimary;
    readonly isVerified: ShopIsVerified;
    readonly createdAt: ShopCreatedAt;
    readonly updatedAt: ShopUpdatedAt;
    readonly addressId: AddressId;
    readonly geolocationId: GeolocationId;
    readonly workspaceId: ShopWorkspaceId;

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
        addressId: AddressId,
        geolocationId: GeolocationId,
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
        this.addressId = addressId;
        this.geolocationId = geolocationId;
        this.workspaceId = workspaceId;
    }

    static fromPrimitives(primitives: ShopPrimitives): Shop {
        return new Shop(
            new ShopId(primitives.id),
            new ShopName(primitives.name),
            new ShopSlug(primitives.slug),
            new ShopDescription(primitives.description),
            new ShopBanner(primitives.banner),
            new ShopPhone(primitives.phone),
            new ShopIsPrimary(primitives.isPrimary),
            new ShopIsVerified(primitives.isVerified),
            new ShopCreatedAt(primitives.createdAt),
            new ShopUpdatedAt(primitives.updatedAt),
            new AddressId(primitives.addressId),
            new GeolocationId(primitives.geolocationId),
            new ShopWorkspaceId(primitives.workspaceId),
        );
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
            addressId: this.addressId.value,
            geolocationId: this.geolocationId.value,
            workspaceId: this.workspaceId.value,
        };
    }
}
