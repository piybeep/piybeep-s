import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const PORT = config.get<number>('API_PORT') ?? 5000;

  app.setGlobalPrefix('/api/v1');
  app.enableCors({ credentials: true, origin: true });

  const apiDocument = new DocumentBuilder()
    .setTitle('Piybeep API')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http' })
    .build();
  const document = SwaggerModule.createDocument(app, apiDocument);
  SwaggerModule.setup('/api/doc', app, document);

  await app.listen(PORT);
}

bootstrap();
