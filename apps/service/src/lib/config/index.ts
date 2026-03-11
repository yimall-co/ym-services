import { ConfigFactory } from '@nestjs/config';

import appConfig from './app.config';
import jwtConfig from './jwt.config';
import redisConfig from './redis.config';
import databaseConfig from './database.config';

const config = [appConfig, jwtConfig, redisConfig, databaseConfig] as unknown as ConfigFactory[];

export default config;
