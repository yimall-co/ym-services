export class EnumValueObject<T> {
    readonly value: T;

    constructor(value: T, validValues: T[]) {
        this.value = value;

        this.ensureIsValidValue(validValues);
    }

    private ensureIsValidValue(validValues: T[]): void {
        if (!validValues.includes(this.value)) {
            throw new Error(`Invalid value: ${this.value}`);
        }
    }
}