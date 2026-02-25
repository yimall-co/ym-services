import { AggregateRoot } from 'shared/domain/aggregate-root';

import { AddressId } from 'vm/shared/domain/address-id';

import { AddressStreet } from './value-object/address-street';
import { AddressNumber } from './value-object/address-number';
import { AddressComplement } from './value-object/address-complement';
import { AddressNeighborhood } from './value-object/address-neighborhood';
import { AddressCity } from './value-object/address-city';
import { AddressState } from './value-object/address-state';
import { AddressCountry } from './value-object/address-country';
import { AddressPostalCode } from './value-object/address-postal-code';
import { AddressIsOnline } from './value-object/address-is-online';
import { AddressCreatedAt } from './value-object/address-created-at';
import { AddressUpdatedAt } from './value-object/address-updated-at';

export interface AddressPrimitives {
    id: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    isOnline: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export class Address extends AggregateRoot {
    readonly id: AddressId;
    readonly street: AddressStreet;
    readonly number: AddressNumber;
    readonly complement: AddressComplement;
    readonly neighborhood: AddressNeighborhood;
    readonly city: AddressCity;
    readonly state: AddressState;
    readonly country: AddressCountry;
    readonly postalCode: AddressPostalCode;
    readonly isOnline: AddressIsOnline;
    readonly createdAt: AddressCreatedAt;
    readonly updatedAt: AddressUpdatedAt;

    constructor(
        id: AddressId,
        street: AddressStreet,
        number: AddressNumber,
        complement: AddressComplement,
        neighborhood: AddressNeighborhood,
        city: AddressCity,
        state: AddressState,
        country: AddressCountry,
        postalCode: AddressPostalCode,
        isOnline: AddressIsOnline,
        createdAt: AddressCreatedAt,
        updatedAt: AddressUpdatedAt,
    ) {
        super();
        this.id = id;
        this.street = street;
        this.number = number;
        this.complement = complement;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
        this.country = country;
        this.postalCode = postalCode;
        this.isOnline = isOnline;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromPrimitives(primitives: AddressPrimitives): Address {
        return new Address(
            new AddressId(primitives.id),
            new AddressStreet(primitives.street),
            new AddressNumber(primitives.number),
            new AddressComplement(primitives.complement),
            new AddressNeighborhood(primitives.neighborhood),
            new AddressCity(primitives.city),
            new AddressState(primitives.state),
            new AddressCountry(primitives.country),
            new AddressPostalCode(primitives.postalCode),
            new AddressIsOnline(primitives.isOnline),
            new AddressCreatedAt(primitives.createdAt),
            new AddressUpdatedAt(primitives.updatedAt),
        );
    }

    toPrimitives(): AddressPrimitives {
        return {
            id: this.id.value,
            street: this.street.value,
            number: this.number.value,
            complement: this.complement.value,
            neighborhood: this.neighborhood.value,
            city: this.city.value,
            state: this.state.value,
            country: this.country.value,
            postalCode: this.postalCode.value,
            isOnline: this.isOnline.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
        };
    }
}
