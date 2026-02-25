import { AnyPgTable, PgTable } from 'drizzle-orm/pg-core';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export abstract class DrizzleRepository<TTable extends AnyPgTable> {
    constructor(protected readonly db: NodePgDatabase) {}

    protected abstract readonly table: TTable;

    protected select() {
        return this.db.select().from<PgTable>(this.table);
    }

    protected insert() {
        return this.db.insert(this.table);
    }

    protected updated() {
        return this.db.update(this.table);
    }

    protected delete() {
        return this.db.delete(this.table);
    }

    protected get client(): NodePgDatabase {
        return this.db;
    }

    protected get selectModel(): InferSelectModel<TTable> {
        return {} as InferSelectModel<TTable>;
    }

    protected get insertModel(): InferInsertModel<TTable> {
        return {} as InferInsertModel<TTable>;
    }
}
