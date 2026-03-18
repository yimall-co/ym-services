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
import { CacheModule } from '@nestjs/cache-manager';
import { Module, NestModule } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import KeyvRedis from '@keyv/redis';

import config from 'lib/config';

import { ApiModule } from 'presentation/api.module';
import { SharedModule } from 'presentation/shared/shared.module';
import { ResponseInterceptor } from 'presentation/shared/interceptors/response.interceptor';
import { HttpCacheInterceptor } from 'presentation/shared/interceptors/http-cache.interceptor';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { minutesToMilliseconds } from 'date-fns';

const configModule = ConfigModule.forRoot({
    cache: true,
    isGlobal: true,
    load: config,
    envFilePath: ['.env', '.env.local'],
    expandVariables: false,
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
    isGlobal: true,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        const url = configService.getOrThrow<string>('redis.url');
        const ttl = configService.get<number>('redis.ttl', minutesToMilliseconds(2));

        return {
            stores: [
                new Keyv({ store: new CacheableMemory({ ttl, lruSize: 5000 }) }),
                new KeyvRedis(url),
            ],
            ttl,
        };
    },
});

const throttlerModule = ThrottlerModule.forRootAsync({
    inject: [ConfigService],
    useFactory: () => {
        return {
            throttlers: [
                {
                    name: 'short',
                    ttl: 5000,
                    limit: 5,
                },
                {
                    name: 'medium',
                    ttl: 10000,
                    limit: 50,
                },
                {
                    name: 'long',
                    ttl: 60000,
                    limit: 250,
                },
            ],
        };
    },
});

const sharedModule = SharedModule.forRoot();

const apiModule = ApiModule.forRoot();

@Module({
    imports: [configModule, i18nModule, cacheModule, throttlerModule, sharedModule, apiModule],
    controllers: [AppController],
    providers: [
        AppService,
        { provide: APP_GUARD, useClass: ThrottlerGuard },
        { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
        { provide: APP_INTERCEPTOR, useClass: HttpCacheInterceptor },
    ],
})
export class AppModule implements NestModule {
    configure() { }
}
