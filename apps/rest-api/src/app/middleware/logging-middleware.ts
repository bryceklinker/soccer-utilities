import { Request, Response } from 'express';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: () => void) {
    this.logger.log(`Handling request [${req.method}] ${req.url}`);
    res.on('finish', () => {
      this.logger.log(
        `Handled request [${req.method}] ${req.url} responding with ${res.statusCode}`
      );
    });
    next();
  }
}
