import helmet from '@fastify/helmet';
import compress from '@fastify/compress';

import {
    ClassSerializerInterceptor,
    HttpStatus,
    RequestMethod,
    UnprocessableEntityException,
    ValidationError,
    ValidationPipe,
    VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { setupSwagger } from 'lib/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
    const fastifyAdapter = new FastifyAdapter();

    const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter, {
        bufferLogs: true,
    });

    void app.register(helmet);

    void app.register(compress);

    // app.useGlobalFilters(
    //     new GlobalException
    // );

    const reflector = app.get(Reflector);
    const configService = app.get(ConfigService);

    app.enableCors({
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept',
            'X-Requested-With',
            'X-HTTP-Method-Override',
        ],
    });

    app.setGlobalPrefix('api', {
        exclude: [
            {
                method: RequestMethod.GET,
                path: '/health',
            },
        ],
    });

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            exceptionFactory: (errors: ValidationError[]) => {
                return new UnprocessableEntityException(errors);
            },
        }),
    );

    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(reflector, {
            excludeExtraneousValues: true,
        }),
    );

    setupSwagger(app);

    const port = configService.get<number>('app.port', 3001);

    await app.listen(port, (_, address) => {
        console.log(`Application is running on: ${address}`);
    });
}

bootstrap().catch((err) => {
    console.error(err);
    process.exit(1);
});
