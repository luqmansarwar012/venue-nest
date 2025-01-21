import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  INestApplication,
  Logger,
  ValidationPipe,
  HttpException,
  ValidationError,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MongoExceptionFilter } from './utility/exception-filters';
import { json, urlencoded } from 'express';

interface ValidatorErrors {
  [key: string]: string | ValidatorErrors;
}

export class VenueNestApp {
  private static readonly logger = new Logger(VenueNestApp.name);
  private static readonly port = process.env.PORT || 3000;

  public static async start(): Promise<void> {
    const app: INestApplication = await NestFactory.create(AppModule);

    this.setupSwagger(app);
    this.setupValidation(app);
    this.setupGlobalFilters(app);

    await app.listen(this.port, () => {
      this.logger.debug(`🚀 Server running on http://localhost:${this.port}`);
      this.logger.debug(
        `📖 Swagger Docs available at http://localhost:${this.port}/explorer`,
      );
    });
  }

  private static setupSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('VenueNest API')
      .setDescription('VenueNest API Documentation')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT TOKEN',
          in: 'header',
        },
        'JWT-Auth',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('explorer', app, document);
  }

  private static setupValidation(app: INestApplication): void {
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        validationError: { target: true, value: true },

        exceptionFactory: (errors: ValidationError[]) => {
          const errorsException = this.exceptionFactory(errors);
          return new HttpException(errorsException, 422);
        },
      }),
    );
  }

  static exceptionFactory(errors: ValidationError[]): ValidatorErrors {
    const errorsException: ValidatorErrors = {};
    for (const error of errors) {
      if (error.constraints) {
        errorsException[error.property] = Object.values(
          error.constraints,
        ).shift();
      } else if (error.children) {
        errorsException[error.property] = this.exceptionFactory(error.children);
      }
    }
    return errorsException;
  }

  private static setupGlobalFilters(app: INestApplication): void {
    app
      .useGlobalFilters(new MongoExceptionFilter())
      .use(json({ limit: '50mb' }))
      .use(urlencoded({ extended: true, limit: '50mb' }));
  }
}

VenueNestApp.start();
