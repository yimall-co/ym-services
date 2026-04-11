import { registerAs } from '@nestjs/config';

import { createSecret } from 'lib/locker';

export default registerAs('redis', async () => {
    const lockerRead = createSecret({
        accessKeyId: process.env.LOCKER_READ_ACCESS_KEY!,
        secretAccessKey: process.env.LOCKER_READ_SECRET_KEY!,
        cacheOptions: {
            fetch: true,
            restTime: 120,
        },
    });

    const url = await lockerRead.get(
        'REDIS_URL',
        process.env.LOCKER_ENVIRONMENT,
        process.env.REDIS_URL,
    );
    const ttl = await lockerRead.get(
        'REDIS_TTL',
        process.env.LOCKER_ENVIRONMENT,
        process.env.REDIS_TTL,
    );

    return {
        url,
        ttl: Number(ttl),
    };
});
