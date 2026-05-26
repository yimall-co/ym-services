import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { ColorRepository } from 'wm/color/domain/color.repository';
import { ColorRepositoryScope } from 'wm/color/application/color.repository-scope';
import { ColorQueryRepository } from 'wm/color/application/query/color-query.repository';

import { DrizzleColorRepository } from './drizzle-color.repository';

export class DrizzleColorRepositoryScope implements ColorRepositoryScope {
    constructor(private readonly db: NodePgDatabase<Schema>) { }

    getColorRepository(): ColorRepository {
        return new DrizzleColorRepository(this.db);
    }

    getColorQueryRepository(): ColorQueryRepository {
        throw new Error('Method not implemented.');
    }
}
