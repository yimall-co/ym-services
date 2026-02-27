/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { map, Observable } from 'rxjs';
import { FastifyReply } from 'fastify';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

interface Response<T> {
    statusCode: number;
    data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler<T>,
    ): Observable<Response<T>> | Promise<Observable<Response<T>>> {
        const httpContext = context.switchToHttp();
        const response = httpContext.getResponse<FastifyReply>();

        const statusCode = response.raw.statusCode;

        return next.handle().pipe(map((data) => ({ statusCode, data })));
    }
}
