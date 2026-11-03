import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseEntity } from '../response/response.entity';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected error occurred.';
    const errors: Record<string, string>[] = [];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();
      message = typeof response === 'string' ? response : (response as any)?.message ?? message;
      if (typeof response === 'object' && (response as any)?.errors) {
        errors.push(...(response as any).errors);
      }
    } else if (exception instanceof Error && 'code' in exception) {
      // Prisma client errors have a .code property
      const code = (exception as any).code;
      if (code === 'P2002') {
        status = HttpStatus.CONFLICT;
        message = 'A record with this value already exists.';
        errors.push({ field: (exception as any).meta?.target?.[0]?.toString() ?? 'unique constraint', message: 'Duplicate entry.' });
      } else if (code === 'P2025') {
        status = HttpStatus.NOT_FOUND;
        message = 'The requested resource was not found.';
      } else {
        status = HttpStatus.BAD_REQUEST;
        message = `Database error: ${code}`;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    const body: ResponseEntity = {
      statusCode: status,
      message: Array.isArray(message) ? message : [message],
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      errors: errors.length ? errors : undefined,
    };

    if (process.env.NODE_ENV === 'production') {
      this.logger.error(`${req.method} ${req.originalUrl} ${status}`, { error: message, stack: undefined });
    } else {
      this.logger.error(`${req.method} ${req.originalUrl} ${status}`, exception);
    }

    res.status(status).json(body);
  }
}
