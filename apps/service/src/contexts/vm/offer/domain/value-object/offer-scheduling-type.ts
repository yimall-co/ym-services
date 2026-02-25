import { EnumValueObject } from 'shared/domain/value-object/enum.value-object';

export enum SchedulingTypes {
    PROVIDER = 'provider',
    CAPACITY = 'capacity',
}

export class OfferSchedulingType extends EnumValueObject<SchedulingTypes> {
    constructor(value: SchedulingTypes) {
        super(value, Object.values(SchedulingTypes));
    }
}
