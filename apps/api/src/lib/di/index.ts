import 'reflect-metadata';

import { container, instanceCachingFactory } from 'tsyringe';

import { DrizzleClientFactory } from 'shared/infrastructure/persistence/drizzle/client-factory';

container
    .register('Drizzle', {
        useFactory: instanceCachingFactory(
            () => {
                const pool = DrizzleClientFactory.createPool({
                    connectionString: process.env.DATABASE_URL,
                });
                return DrizzleClientFactory.createClient(pool);
            }),
    })
    .register('', {
        useFactory: () => { },
    });