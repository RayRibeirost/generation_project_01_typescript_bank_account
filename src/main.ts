import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors();

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
  SwaggerModule.setup('/docs', app, document);
}
bootstrap();
