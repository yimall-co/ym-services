import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    port: Number(process.env.APP_PORT ?? 3001),
    name: process.env.APP_NAME,
    version: process.env.APP_VERSION,
    description: process.env.APP_DESCRIPTION,
    fallbackLanguage: 'es',
    nodeEnv: process.env.NODE_ENV,
}));
