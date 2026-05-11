/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new LoggingInterceptor(app.get('winston')));

  const config = new DocumentBuilder()
    .setTitle('Bank Account API - Raylander Ribeiro - rayribeirost')
    .setDescription(
      'Bank Account API, a NestJS project, developed by Rayribeirost - 2026',
    )
    .setContact(
      'Raylander Ribeiro - rayribeirost',
      'https://www.linkedin.com/in/raylanderribeiro/',
      'ribeiroraylander7@gmail.com',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  logger.log(
    `Application running at: http://localhost:${process.env.PORT ?? 3000}`,
  );
  logger.log(
    `Swagger available at at: http://localhost:${process.env.PORT ?? 3000}/api/docs`,
  );
}
bootstrap();
