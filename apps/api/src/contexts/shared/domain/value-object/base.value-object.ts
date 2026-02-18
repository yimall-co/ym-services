export type Primitives = string | number | boolean | Date;

export abstract class ValueObject<T> {
    readonly value: T;

    protected constructor(value: T) {
        this.value = value;
        Object.freeze(this);
    }

    equals(other?: ValueObject<T>): boolean {
        if (!other) return false;
        if (other.constructor !== this.constructor) return false;

        return this.deepEqual(this.value, other.value);
    }

    private deepEqual(a: any, b: any): boolean {
        if (a === b) return true;

        if (a instanceof Date && b instanceof Date) {
            return a.getTime() === b.getTime();
        }

        if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
            return false;
        }

        const keysA = Object.keys(a);
        const keysB = Object.keys(b);

        if (keysA.length !== keysB.length) return false;

        return keysA.every(key => this.deepEqual(a[key], b[key]));
    }
}