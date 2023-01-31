import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = app.get(ConfigService);
	const PORT = config.get<number>('API_PORT') ?? 5000;

	app.use(
		morgan(
			'[:date[clf]] :method :url :status :res[content-length] :response-time ms ":referrer" ":user-agent"',
		),
	);
	app.setGlobalPrefix('/api');
	app.useGlobalPipes(new ValidationPipe());
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
