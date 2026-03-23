import { registerAs } from '@nestjs/config';

import { createSecret } from 'lib/locker';

export default registerAs('jwt', async () => {
    const lockerRead = createSecret({
        accessKeyId: process.env.LOCKER_READ_ACCESS_KEY!,
        secretAccessKey: process.env.LOCKER_READ_SECRET_KEY!,
        cacheOptions: {
            fetch: false,
            restTime: 5,
        },
    });

    const jwtAccessSecret = await lockerRead.get('JWT_ACCESS_SECRET');
    const jwtAccessPublicKey = await lockerRead.get('JWT_ACCESS_PUBLIC_KEY');
    const jwtAccessPrivateKey = await lockerRead.get('JWT_ACCESS_PRIVATE_KEY');
    const jwtAccessExpiresIn = await lockerRead.get('JWT_ACCESS_TTL');
    const jwtRefreshSecret = await lockerRead.get('JWT_REFRESH_SECRET');
    const jwtRefreshPublicKey = await lockerRead.get('JWT_REFRESH_PUBLIC_KEY');
    const jwtRefreshPrivateKey = await lockerRead.get('JWT_REFRESH_PRIVATE_KEY');
    const jwtRefreshExpiresIn = await lockerRead.get('JWT_REFRESH_TTL');

    return {
        accessSecret: jwtAccessSecret,
        accessPublicKey: jwtAccessPublicKey,
        accessPrivateKey: jwtAccessPrivateKey,
        accessExpiresIn: jwtAccessExpiresIn,
        refreshSecret: jwtRefreshSecret,
        refreshPublicKey: jwtRefreshPublicKey,
        refreshPrivateKey: jwtRefreshPrivateKey,
        refreshExpiresIn: jwtRefreshExpiresIn,
    };
});
