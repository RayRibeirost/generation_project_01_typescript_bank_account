import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const traceId = uuidv4();
    const { method, url, ip } = request;
    const startTime = Date.now();
    request['traceId'] = traceId;
    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - startTime;
          const statusCode = response.statusCode;
          this.logger.info('HTTP Request', {
            traceId,
            method,
            url,
            statusCode,
            duration_ms: duration,
            ip,
          });
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          this.logger.error('HTTP Error', {
            traceId,
            method,
            url,
            statusCode: error.status ?? 500,
            duration_ms: duration,
            error: error.message,
            stack: error.stack,
            ip,
          });
        },
      }),
    );
  }
}
