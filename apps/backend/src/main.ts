import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        exposeDefaultValues: true,
        enableImplicitConversion: true,
      },
    }),
  );
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.TARGET_SITE || 'localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['*', 'Content-Type', 'content-Type', 'Authorization'],
  });
  app.use(helmet());

  if (process.env.NODE_ENV === 'development') {
    const docsConfig = new DocumentBuilder()
      .setTitle('CryptoTrade API')
      .setDescription('API for CryptoTrade demo stock market application')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, docsConfig);

    SwaggerModule.setup('docs', app, document);
  }

  const port = process.env.PORT || 4000;

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

function main() {
  try {
    Logger.log('Bootstraping...');
    bootstrap();
  } catch (error: unknown) {
    Logger.error(error);
    Logger.warn('Retrying...');
    setTimeout(main, 5000);
  }
}

main();
