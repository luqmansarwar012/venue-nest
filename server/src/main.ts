import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class VenueNestApp {
  private static readonly logger = new Logger(VenueNestApp.name);
  private static readonly port = process.env.PORT || 3000;

  public static async start(): Promise<void> {
    const app: INestApplication = await NestFactory.create(AppModule);

    this.setupSwagger(app);

    await app.listen(this.port, () =>
      this.logger.debug(`🚀 Server running on http://localhost:${this.port}`),
    );
  }

  private static setupSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('NestJS API')
      .setDescription('NestJS API Documentation')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('explorer', app, document);
    this.logger.debug(
      `📖 Swagger Docs available at http://localhost:3000/explorer`,
    );
  }
}

VenueNestApp.start();
