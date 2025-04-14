import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
// core
import { resolve } from 'path';
import { writeFileSync, createWriteStream } from 'fs';
import { get } from 'http';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('API E-Teral')
    .setDescription('Documentation API de la plateforme E-Teral')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Validation globale
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // CORS
  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application API démarrée sur: http://localhost:${port}`);
  console.log(`Documentation Swagger disponible sur: http://localhost:${port}/api/docs`);
  // get the swagger json file (if app is running in development mode)
  if (process.env.NODE_ENV === 'development') {
    const serverUrl = `http://localhost:${port}/api/docs`;
    // write swagger ui files
    get(
      `${serverUrl}/swagger-ui-bundle.js`, function
      (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui-bundle.js'));
    });

    get(`${serverUrl}/swagger-ui-init.js`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui-init.js'));
    });

    get(
      `${serverUrl}/swagger-ui-standalone-preset.js`,
      function (response) {
        response.pipe(
          createWriteStream('swagger-static/swagger-ui-standalone-preset.js'),
        );
      });

    get(`${serverUrl}/swagger-ui.css`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui.css'));
    });

  }
}
bootstrap();