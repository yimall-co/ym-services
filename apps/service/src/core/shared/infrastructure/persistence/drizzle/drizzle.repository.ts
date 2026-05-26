import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';

import { PgSelect, AnyPgTable } from 'drizzle-orm/pg-core';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export abstract class DrizzleRepository<TTable extends AnyPgTable> {
    constructor(protected readonly db: NodePgDatabase<typeof import('./schema')>) { }

    protected abstract readonly table: TTable;

    protected select() {
        return this.db.select().from<any>(this.table);
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

    // eslint-disable-next-line prettier/prettier
    protected withPagination<TQuery extends PgSelect>(
        query: TQuery,
        page: number = 1,
        pageSize: number = 10,
    ) {
        return query.limit(pageSize).offset((page - 1) * pageSize);
    }

    protected withCursorPagination<TResult>(result: Array<TResult>, limit: number) {
        const hasNextPage = result?.length > limit;
        const data = hasNextPage ? result.slice(0, limit) : result;
        const lastItem = data.at(-1) ?? null;

        return {
            results: data,
            hasNextPage,
            lastItem,
        };
    }

    protected get client() {
        return this.db;
    }

    protected get selectModel(): InferSelectModel<TTable> {
        return {} as InferSelectModel<TTable>;
    }

    protected get insertModel(): InferInsertModel<TTable> {
        return {} as InferInsertModel<TTable>;
    }
}
