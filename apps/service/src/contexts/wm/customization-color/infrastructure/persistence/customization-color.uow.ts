import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { UnitOfWork } from 'shared/infrastructure/unit-of-work';

import { CustomizationColorRepositoryScope } from 'wm/customization-color/application/customization-color.repository-scope';

import { DrizzleCustomizationColorRepositoryScope } from './drizzle-customization-color.repository-scope';

export class CustomizationColorUnitOfWork implements UnitOfWork<CustomizationColorRepositoryScope> {
    constructor(
        private readonly db: NodePgDatabase<
            typeof import('shared/infrastructure/persistence/drizzle/schema')
        >,
    ) { }

    withTransaction<T>(fn: (scope: CustomizationColorRepositoryScope) => Promise<T>): Promise<T> {
        return this.db.transaction(async (tx) => {
            const scope = new DrizzleCustomizationColorRepositoryScope(tx);
            const result = await fn(scope);

            return result;
        });
    }
}
