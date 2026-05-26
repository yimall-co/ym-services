import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { CustomizationRepository } from 'wm/customization/domain/customization.repository';
import { CustomizationRepositoryScope } from 'wm/customization/application/customization.repository-scope';
import { CustomizationQueryRepository } from 'wm/customization/application/query/customization-query.repository';
import { ColorRepository } from 'wm/color/domain/color.repository';
import { ColorQueryRepository } from 'wm/color/application/query/color-query.repository';

import { DrizzleCustomizationRepository } from './drizzle-customization.repository';
import { DrizzleCustomizationQueryRepository } from './drizzle-customization-query.repository';

export class DrizzleCustomizationRepositoryScope implements CustomizationRepositoryScope {
    constructor(private readonly db: NodePgDatabase<Schema>) { }

    getCustomizationRepository(): CustomizationRepository {
        return new DrizzleCustomizationRepository(this.db);
    }

    getCustomizationQueryRepository(): CustomizationQueryRepository {
        return new DrizzleCustomizationQueryRepository(this.db);
    }

    getColorRepository(): ColorRepository {
        throw new Error('Method not implemented.');
    }

    getColorQueryRepository(): ColorQueryRepository {
        throw new Error('Method not implemented.');
    }
}
