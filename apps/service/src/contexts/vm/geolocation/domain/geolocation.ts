import { AggregateRoot } from 'shared/domain/aggregate-root';

import { GeolocationId } from 'vm/shared/domain/geolocation-id';
import { ShopId } from 'vm/shared/domain/shop-id';

import { GeolocationLatitude } from './value-object/geolocation-latitude';
import { GeolocationLongitude } from './value-object/geolocation-longitude';
import { GeolocationAccuracy } from './value-object/geolocation-accuracy';
import { GeolocationCreatedAt } from './value-object/geolocation-created-at';
import { GeolocationUpdatedAt } from './value-object/geolocation-updated-at';

export interface GeolocationPrimitives {
    id: string;
    latitude: number;
    longitude: number;
    accuracy: number;
    createdAt: Date;
    updatedAt: Date;
    shopId: string;
}

export class Geolocation extends AggregateRoot<GeolocationPrimitives> {
    private readonly id: GeolocationId;
    private latitude: GeolocationLatitude;
    private longitude: GeolocationLongitude;
    private accuracy: GeolocationAccuracy;
    private readonly createdAt: GeolocationCreatedAt;
    private updatedAt: GeolocationUpdatedAt;
    private shopId: ShopId;

    constructor(
        id: GeolocationId,
        latitude: GeolocationLatitude,
        longitude: GeolocationLongitude,
        accuracy: GeolocationAccuracy,
        createdAt: GeolocationCreatedAt,
        updatedAt: GeolocationUpdatedAt,
        shopId: ShopId,
    ) {
        super();

        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.accuracy = accuracy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.shopId = shopId;
    }

    static create(
        latitude: number,
        longitude: number,
        accuracy: number,
        shopId: string,
    ): Geolocation {
        return new Geolocation(
            GeolocationId.random(),
            new GeolocationLatitude(latitude),
            new GeolocationLongitude(longitude),
            new GeolocationAccuracy(accuracy),
            new GeolocationCreatedAt(new Date()),
            new GeolocationUpdatedAt(new Date()),
            new ShopId(shopId),
        );
    }

    static fromPrimitives(primitives: GeolocationPrimitives): Geolocation {
        return new Geolocation(
            new GeolocationId(primitives.id),
            new GeolocationLatitude(primitives.latitude),
            new GeolocationLongitude(primitives.longitude),
            new GeolocationAccuracy(primitives.accuracy),
            new GeolocationCreatedAt(primitives.createdAt),
            new GeolocationUpdatedAt(primitives.updatedAt),
            new ShopId(primitives.shopId),
        );
    }

    getId(): GeolocationId {
        return this.id;
    }

    getLatitude(): GeolocationLatitude {
        return this.latitude;
    }

    getLongitude(): GeolocationLongitude {
        return this.longitude;
    }

    getAccuracy(): GeolocationAccuracy {
        return this.accuracy;
    }

    getCreatedAt(): GeolocationCreatedAt {
        return this.createdAt;
    }

    getUpdatedAt(): GeolocationUpdatedAt {
        return this.updatedAt;
    }

    getShopId(): ShopId {
        return this.shopId;
    }

    toPrimitives(): GeolocationPrimitives {
        return {
            id: this.id.value,
            latitude: this.latitude.value,
            longitude: this.longitude.value,
            accuracy: this.accuracy.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            shopId: this.shopId.value,
        };
    }

    private touch(): void {
        this.updatedAt = new GeolocationUpdatedAt(new Date());
    }
}
