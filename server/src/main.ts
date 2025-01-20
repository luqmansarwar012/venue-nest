import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class VenueNestApp {
  private static readonly logger = new Logger(VenueNestApp.name);
  private static readonly port = process.env.PORT || 3000;

  public static async start(): Promise<void> {
    const app: INestApplication = await NestFactory.create(AppModule);

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    this.setupSwagger(app);

    await app.listen(this.port, () =>
      this.logger.debug(`🚀 Server running on http://localhost:${this.port}`),
    );
    this.logger.debug(
      `📖 Swagger Docs available at http://localhost:${this.port}/explorer`,
    );
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
}

VenueNestApp.start();
