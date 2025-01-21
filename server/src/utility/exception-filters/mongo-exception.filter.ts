import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { MongoServerError } from 'mongodb';

@Catch()
export class MongoExceptionFilter implements ExceptionFilter {
  private logger: Logger = new Logger(MongoExceptionFilter.name);
  catch(exception: MongoServerError | HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (
      exception.name === 'MongoServerError' ||
      exception.name === 'MongoError'
    ) {
      const error: MongoServerError = exception as MongoServerError;
      if (error.code === 11000) {
        response.status(409).json({
          statusCode: 409,
          message: 'Duplicate key error.',
        });
      } else if (error.code === 16755) {
        response.status(400).json({
          statusCode: 400,
          message: 'MongoDB validation error.',
        });
      } else {
        this.logger.error('Mongo Exception -> ', exception);
        response.status(500).json({
          statusCode: 500,
          message: 'Internal Server Error.',
        });
      }
    } else {
      if (exception instanceof HttpException) {
        const statusCode = exception.getStatus();
        const errorResponse = exception.getResponse();
        response.status(statusCode).json({
          statusCode,
          message:
            typeof errorResponse === 'string'
              ? errorResponse
              : errorResponse['message'],
        });
      } else {
        this.logger.error('Unhandled Exception -> ', exception);
        response.status(500).json({
          statusCode: 500,
          message: 'Internal Server Error.',
        });
      }
    }
  }
}
