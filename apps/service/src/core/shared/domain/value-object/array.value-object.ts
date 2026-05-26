export abstract class ArrayValueObject<T> {
    readonly value: Array<T>;

    constructor(value: Array<T>) {
        this.value = value;

        this.ensureIsArray();
    }

    private ensureIsArray(): void {
        if (!Array.isArray(this.value)) {
            throw new Error('Value must be an array');
        }
    }
}
