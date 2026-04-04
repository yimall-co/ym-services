import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { CustomizationRepositoryScope } from 'wm/customization/application/customization.repository-scope';

import { DrizzleCustomizationRepositoryScope } from './drizzle-customization.repository-scope';

export class CustomizationUnitOfWork implements UnitOfWork<CustomizationRepositoryScope> {
    constructor(
        private readonly db: NodePgDatabase<
            typeof import('shared/infrastructure/persistence/drizzle/schema')
        >,
    ) { }

    withTransaction<T>(fn: (scope: CustomizationRepositoryScope) => Promise<T>): Promise<T> {
        return this.db.transaction(async (tx) => {
            const scope = new DrizzleCustomizationRepositoryScope(tx);
            const result = await fn(scope);

            return result;
        });
    }
}
