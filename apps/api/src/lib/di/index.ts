import 'reflect-metadata';

import { container, instanceCachingFactory } from 'tsyringe';

import { DrizzleClientFactory } from 'shared/infrastructure/persistence/drizzle/client-factory';

container
    .register('db', {
        useFactory: instanceCachingFactory(
        () => {
            const pool = DrizzleClientFactory.createPool({
                connectionString: process.env.DATABASE_URL,
            });
            const client = DrizzleClientFactory.createClient(pool);

            return client;
        }),
    })