import { ConfigFactory } from '@nestjs/config';

import appConfig from './app.config';
import jwtConfig from './jwt.config';
import redisConfig from './redis.config';
import databaseConfig from './database.config';
import s3Config from './s3.config';
import agentConfig from './agent.config';

const config = [
    appConfig,
    jwtConfig,
    redisConfig,
    databaseConfig,
    s3Config,
    agentConfig,
] as unknown as ConfigFactory[];

export default config;
