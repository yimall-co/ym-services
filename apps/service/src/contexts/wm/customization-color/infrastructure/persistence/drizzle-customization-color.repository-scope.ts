import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { CustomizationColorRepository } from 'wm/customization-color/domain/customization-color.repository';
import { CustomizationColorRepositoryScope } from 'wm/customization-color/application/customization-color.repository-scope';
import { CustomizationColorQueryRepository } from 'wm/customization-color/application/query/customization-color-query.repository';

import { DrizzleCustomizationColorRepository } from './drizzle-customization-color.repository';

export class DrizzleCustomizationColorRepositoryScope implements CustomizationColorRepositoryScope {
    constructor(
        private readonly db: NodePgDatabase<
            typeof import('shared/infrastructure/persistence/drizzle/schema')
        >,
    ) { }

    getCustomizationColorRepository(): CustomizationColorRepository {
        return new DrizzleCustomizationColorRepository(this.db);
    }

    getCustomizationColorQueryRepository(): CustomizationColorQueryRepository {
        throw new Error('Method not implemented.');
    }
}
