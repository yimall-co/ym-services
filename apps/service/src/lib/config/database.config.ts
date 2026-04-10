import { registerAs } from '@nestjs/config';

import { createSecret } from 'lib/locker';

export default registerAs('database', async () => {
    const lockerRead = createSecret({
        accessKeyId: process.env.LOCKER_READ_ACCESS_KEY!,
        secretAccessKey: process.env.LOCKER_READ_SECRET_KEY!,
        cacheOptions: {
            fetch: true,
            restTime: 120,
        },
    });

    const url = await lockerRead.get('DB_URL', process.env.LOCKER_ENVIRONMENT);

    return {
        url,
    };
});
