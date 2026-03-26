import { DateValueObject } from 'shared/domain/value-object/date.value-object';

import { ProfileInvalidBirthdate } from '../error/profile-invalid-birthdate';

export class ProfileBirthdate extends DateValueObject {
    constructor(value: Date) {
        super(value);

        this.ensureIsAdult(value);
    }

    private ensureIsAdult(value: Date): void {
        const age = this.calculateAge(value);

        if (age < 16) {
            throw new ProfileInvalidBirthdate();
        }
    }

    private calculateAge(value: Date): number {
        const today = new Date();

        let age = today.getFullYear() - value.getFullYear();

        const monthDifference = today.getMonth() - value.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < value.getDate())) {
            age--;
        }

        return age;
    }
}
