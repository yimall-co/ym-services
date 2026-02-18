import { AnyPgTable } from 'drizzle-orm/pg-core';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export abstract class DrizzleRepository<TTable extends AnyPgTable> {
    constructor(protected readonly replica: NodePgDatabase) { }

    protected abstract entitySchema(): TTable;

    protected get client(): NodePgDatabase {
        return this.replica;
    }
}