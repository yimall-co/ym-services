/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import path from 'node:path';

import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';
import {
    I18nModule,
    QueryResolver,
    HeaderResolver,
    AcceptLanguageResolver,
    CookieResolver,
} from 'nestjs-i18n';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

import KeyvRedis from '@keyv/redis';

import appConfig from 'lib/config/app.config';
import databaseConfig from 'lib/config/database.config';
import redisConfig from 'lib/config/redis.config';

import { ApiModule } from 'presentation/api.module';
import { SharedModule } from 'presentation/shared/shared.module';
import { ResponseInterceptor } from 'presentation/shared/interceptors/response.interceptor';

import { AppService } from './app.service';
import { AppController } from './app.controller';

const configModule = ConfigModule.forRoot({
    isGlobal: true,
    load: [appConfig, databaseConfig, redisConfig],
    envFilePath: ['.env', '.env.local'],
});

const i18nModule = I18nModule.forRootAsync({
    inject: [ConfigService],
    resolvers: [
        new CookieResolver(['lang']),
        new HeaderResolver(['lang']),
        new QueryResolver(['lang', 'l']),
        AcceptLanguageResolver,
    ],
    useFactory: (configService: ConfigService) => {
        const env = configService.getOrThrow<string>('app.nodeEnv');
        const fallbackLanguage = configService.getOrThrow<string>('app.fallbackLanguage');

        const isDevelopment = env !== 'production';

        const outputPath = path.join(process.cwd(), 'src/i18n');
        const typesOutputPath = path.join(process.cwd(), 'i18n.d.ts');

        return {
            fallbackLanguage,
            loaderOptions: {
                path: outputPath,
                watch: isDevelopment,
            },
            typesOutputPath,
            logging: isDevelopment,
        };
    },
});

const cacheModule = CacheModule.registerAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        const ttl = configService.getOrThrow<number>('redis.ttl');
        const url = configService.getOrThrow<string>('redis.url');

        return {
            isGlobal: true,
            stores: [
                new Keyv({ store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }) }),
                new KeyvRedis(url),
            ],
            ttl,
        };
    },
});

const sharedModule = SharedModule.forRoot();

const apiModule = ApiModule.forRoot();

@Module({
    imports: [configModule, i18nModule, cacheModule, sharedModule, apiModule],
    controllers: [AppController],
    providers: [AppService, { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }],
})
export class AppModule implements NestModule {
    configure() { }
}
