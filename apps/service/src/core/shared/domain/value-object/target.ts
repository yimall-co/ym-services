import { BaseValueObject } from './base.value-object';

type TargetPrimitives<T> = {
    type: T;
    id: string;
};

export class Target<T> extends BaseValueObject<TargetPrimitives<T>> {
    constructor(type: T, id: string) {
        super({ type, id });
    }

    get type(): T {
        return this.value.type;
    }

    get id(): string {
        return this.value.id;
    }
}
