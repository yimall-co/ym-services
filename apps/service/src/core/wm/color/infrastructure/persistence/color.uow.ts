import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { ColorRepositoryScope } from 'wm/color/application/color.repository-scope';

import { DrizzleColorRepositoryScope } from './drizzle-color.repository-scope';

export class ColorUnitOfWork implements UnitOfWork<ColorRepositoryScope> {
    constructor(private readonly db: NodePgDatabase<Schema>) { }

    withTransaction<T>(fn: (scope: ColorRepositoryScope) => Promise<T>): Promise<T> {
        return this.db.transaction(async (tx) => {
            const scope = new DrizzleColorRepositoryScope(tx);
            const result = await fn(scope);

            return result;
        });
    }
}
