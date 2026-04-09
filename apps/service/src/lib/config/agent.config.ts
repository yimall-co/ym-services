import { registerAs } from '@nestjs/config';

import { createSecret } from 'lib/locker';

export default registerAs('agent', async () => {
    const lockerRead = createSecret({
        accessKeyId: process.env.LOCKER_READ_ACCESS_KEY!,
        secretAccessKey: process.env.LOCKER_READ_SECRET_KEY!,
        cacheOptions: {
            fetch: false,
            restTime: 5,
        },
    });

    // const openAiApiKey = await lockerRead.get('OPENAI_API_KEY');
    const openRouterApiKey = await lockerRead.get(
        'OPEN_ROUTER_API_KEY',
        process.env.LOCKER_ENVIRONMENT,
    );

    return {
        // openAiApiKey,
        openRouterApiKey,
    };
});
