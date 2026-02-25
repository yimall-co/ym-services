import path from 'node:path';

import {
    I18nModule,
    QueryResolver,
    HeaderResolver,
    AcceptLanguageResolver,
    CookieResolver,
} from 'nestjs-i18n';
import { Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import appConfig from 'lib/config/app.config';
import databaseConfig from 'lib/config/database.config';

import { ApiModule } from 'presentation/api.module';
import { SharedModule } from 'presentation/shared/shared.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';

const configModule = ConfigModule.forRoot({
    isGlobal: true,
    load: [appConfig, databaseConfig],
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

const sharedModule = SharedModule.forRoot();

const apiModule = ApiModule.forRoot();

@Module({
    imports: [configModule, i18nModule, sharedModule, apiModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure() { }
}
