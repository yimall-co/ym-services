export abstract class ArrayValueObject<T> {
    readonly value: Array<T>;

    constructor(value: Array<T>) {
        this.value = value;

        this.ensureIsArray();
        this.ensureIsNotEmpty();
    }

    private ensureIsArray(): void {
        if (!Array.isArray(this.value)) {
            throw new Error('Value must be an array');
        }
    }

    private ensureIsNotEmpty(): void {
        if (this.value.length === 0) {
            throw new Error('Value must not be empty');
        }
    }
}
