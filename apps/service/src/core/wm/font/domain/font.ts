import { AggregateRoot } from 'shared/domain/aggregate-root';

export interface FontPrimitives { }

export class Font extends AggregateRoot<FontPrimitives> {
    toPrimitives(): FontPrimitives {
        throw new Error("Method not implemented.");
    }
}