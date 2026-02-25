import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
    const configService = app.get(ConfigService);

    const appName = configService.getOrThrow<string>('app.name');
    const appVersion = configService.getOrThrow<string>('app.version');
    const appDescription = configService.getOrThrow<string>('app.description');

    const config = new DocumentBuilder()
        .setTitle(appName)
        .setVersion(appVersion)
        .setDescription(appDescription)
        .setContact('yimall.co', 'https://yimall.co', 'contact@yimall.co')
        .build();

    const document = SwaggerModule.createDocument(app, config, {
        extraModels: [],
    });

    SwaggerModule.setup('docs', app, document, {
        customSiteTitle: appName,
    });
}
