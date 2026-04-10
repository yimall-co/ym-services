import { Pool, PoolConfig } from 'pg';
import { withReplicas } from 'drizzle-orm/pg-core';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';

import * as schema from './schema';

export class DrizzleClientFactory {
    static createPool(config?: PoolConfig): Pool {
        return new Pool(config);
    }

    static createClient(pool: Pool): ReturnType<typeof drizzle> {
        return drizzle(pool, { schema });
    }

    static createClientWithReplica<
        TPrimary extends NodePgDatabase,
        TReplica extends NodePgDatabase,
    >(primary: TPrimary, replicas: Array<TReplica>): ReturnType<typeof withReplicas> {
        const db = withReplicas(primary, replicas as any);
        return db;
    }
}
