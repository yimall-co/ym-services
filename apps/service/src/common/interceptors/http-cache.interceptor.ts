import { FastifyReply } from 'fastify';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
    trackBy(context: ExecutionContext): string | undefined {
        const http = context.switchToHttp();
        const request = http.getRequest<FastifyReply>();

        const { httpAdapter } = this.httpAdapterHost;

        const isGetRequest = httpAdapter.getRequestMethod(request) === 'GET';
        const excludePaths: ReadonlyArray<string> = [
            // Routes to be excluded
        ];

        if (
            !isGetRequest ||
            (isGetRequest && excludePaths.includes(httpAdapter.getRequestUrl(request)))
        ) {
            return undefined;
        }

        return httpAdapter.getRequestUrl(request);
    }
}
