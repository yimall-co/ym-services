import { registerAs } from '@nestjs/config';

import { createSecret } from 'lib/locker';

export default registerAs('s3', async () => {
    const lockerRead = createSecret({
        accessKeyId: process.env.LOCKER_READ_ACCESS_KEY!,
        secretAccessKey: process.env.LOCKER_READ_SECRET_KEY!,
        cacheOptions: {
            fetch: false,
            restTime: 5,
        },
    });

    const s3Region = await lockerRead.get('S3_REGION', process.env.LOCKER_ENVIRONMENT);
    const s3Endpoint = await lockerRead.get('S3_ENDPOINT', process.env.LOCKER_ENVIRONMENT);
    const s3AccessKey = await lockerRead.get('S3_ACCESS_KEY', process.env.LOCKER_ENVIRONMENT);
    const s3SecretKey = await lockerRead.get('S3_SECRET_KEY', process.env.LOCKER_ENVIRONMENT);
    const s3BucketName = await lockerRead.get('S3_BUCKET_NAME', process.env.LOCKER_ENVIRONMENT);

    return {
        region: s3Region as string,
        endpoint: s3Endpoint as string,
        accessKeyId: s3AccessKey as string,
        secretAccessKey: s3SecretKey as string,
        bucketName: s3BucketName as string,
    };
});
