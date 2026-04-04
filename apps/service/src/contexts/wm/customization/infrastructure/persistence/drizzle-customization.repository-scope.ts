import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { CustomizationRepository } from 'wm/customization/domain/customization.repository';
import { CustomizationRepositoryScope } from 'wm/customization/application/customization.repository-scope';
import { CustomizationQueryRepository } from 'wm/customization/application/query/customization-query.repository';
import { CustomizationColorRepository } from 'wm/customization-color/domain/customization-color.repository';

import { DrizzleCustomizationRepository } from './drizzle-customization.repository';
import { DrizzleCustomizationQueryRepository } from './drizzle-customization-query.repository';
import { CustomizationColorQueryRepository } from 'wm/customization-color/application/query/customization-color-query.repository';

export class DrizzleCustomizationRepositoryScope implements CustomizationRepositoryScope {
    constructor(
        private readonly db: NodePgDatabase<
            typeof import('shared/infrastructure/persistence/drizzle/schema')
        >,
    ) { }

    getCustomizationRepository(): CustomizationRepository {
        return new DrizzleCustomizationRepository(this.db);
    }

    getCustomizationQueryRepository(): CustomizationQueryRepository {
        return new DrizzleCustomizationQueryRepository(this.db);
    }

    getCustomizationColorRepository(): CustomizationColorRepository {
        throw new Error('Method not implemented.');
    }

    getCustomizationColorQueryRepository(): CustomizationColorQueryRepository {
        throw new Error('Method not implemented.');
    }
}
