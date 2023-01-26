import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { RequestsModule } from './requests/requests.module';
import { MailModule } from './mail/mail.module';
import * as Joi from 'joi';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
			validationSchema: Joi.object({
				API_PORT: Joi.number().integer().positive().default(5000),
				TYPEORM_CONNECTION: Joi.string().default('postgres'),
				TYPEORM_PORT: Joi.number().integer().positive().default(5432),
				TYPEORM_HOST: Joi.string().hostname().default('localhost'),
				TYPEORM_USER: Joi.string().required(),
				TYPEORM_PASSWORD: Joi.string().required(),
				TYPEORM_DB: Joi.string().required(),
				MAIL_HOST: Joi.string().required(),
				MAIL_PORT: Joi.number().integer().positive().default(465),
				MAIL_USER: Joi.string().email().required(),
				MAIL_PASS: Joi.string().required(),
				MAIL_FROM: Joi.string().required(),
				WORK_MAIL: Joi.string().email().default('piybeep@gmail.com'),
			}),
		}),
		ThrottlerModule.forRoot({
			limit: 10,
			ttl: 60,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (config: ConfigService) => ({
				type: config.get<'postgres'>('TYPEORM_CONNECTION'),
				host: config.get<string>('TYPEORM_HOST'),
				username: config.get<string>('TYPEORM_USER'),
				password: config.get<string>('TYPEORM_PASSWORD'),
				database: config.get<string>('TYPEORM_DB'),
				port: config.get<number>('TYPEORM_PORT'),
				entities: [__dirname + 'dist/**/*.entity.{t,j}s'],
				synchronize: true,
				autoLoadEntities: true,
			}),
		}),
		ProductsModule,
		ReviewsModule,
		RequestsModule,
		MailModule,
	],
	providers: [],
})
export class AppModule {}
