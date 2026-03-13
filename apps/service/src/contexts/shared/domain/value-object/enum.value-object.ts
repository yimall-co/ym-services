/* eslint-disable @typescript-eslint/restrict-template-expressions */
export abstract class EnumValueObject<T> {
    readonly value: T;

    constructor(value: T, validValues: Array<T>) {
        this.value = value;

        this.ensureIsValidValue(validValues);
    }

    private ensureIsValidValue(validValues: Array<T>): void {
        if (!validValues.includes(this.value)) {
            throw new Error(`Invalid value: ${this.value}`);
        }
    }
}
