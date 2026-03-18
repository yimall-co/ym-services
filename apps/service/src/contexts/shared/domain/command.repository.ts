import { AggregateRoot } from './aggregate-root';
import { ValueObject } from './value-object/base.value-object';

export interface CommandRepository {
    save<TAggregate extends AggregateRoot>(aggregate: TAggregate): Promise<void>;
    update<TAggregate extends AggregateRoot, TVO extends string>(
        id: ValueObject<TVO>,
        aggregate: TAggregate,
    ): Promise<void>;
    remove<TAggregate extends AggregateRoot, TVO extends string>(
        id: ValueObject<TVO>,
        aggregate: TAggregate,
    ): Promise<void>;
}
