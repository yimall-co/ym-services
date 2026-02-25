import { AggregateRoot } from 'shared/domain/aggregate-root';

import { GeolocationId } from 'vm/shared/domain/geolocation-id';

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
}

export class Geolocation extends AggregateRoot {
    readonly id: GeolocationId;
    readonly latitude: GeolocationLatitude;
    readonly longitude: GeolocationLongitude;
    readonly accuracy: GeolocationAccuracy;
    readonly createdAt: GeolocationCreatedAt;
    readonly updatedAt: GeolocationUpdatedAt;

    constructor(
        id: GeolocationId,
        latitude: GeolocationLatitude,
        longitude: GeolocationLongitude,
        accuracy: GeolocationAccuracy,
        createdAt: GeolocationCreatedAt,
        updatedAt: GeolocationUpdatedAt,
    ) {
        super();

        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.accuracy = accuracy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromPrimitives(primitives: GeolocationPrimitives): Geolocation {
        return new Geolocation(
            new GeolocationId(primitives.id),
            new GeolocationLatitude(primitives.latitude),
            new GeolocationLongitude(primitives.longitude),
            new GeolocationAccuracy(primitives.accuracy),
            new GeolocationCreatedAt(primitives.createdAt),
            new GeolocationUpdatedAt(primitives.updatedAt),
        );
    }

    toPrimitives(): GeolocationPrimitives {
        return {
            id: this.id.value,
            latitude: this.latitude.value,
            longitude: this.longitude.value,
            accuracy: this.accuracy.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
        };
    }
}
