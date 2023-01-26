import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join, resolve } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (config: ConfigService) => ({
				transport: {
					host: config.get<string>('MAIL_HOST'),
					port: config.get<number>('MAIL_PORT'),
					secure: Number(config.get<number>('MAIL_PORT')) === 465,
					auth: {
						user: config.get<string>('MAIL_USER'),
						pass: config.get<string>('MAIL_PASS'),
					},
					logger: true,
				},
				defaults: {
					from: `${config.get<string>(
						'MAIL_FROM',
					)} <${config.get<string>('MAIL_USER')}>`,
				},
				template: {
					dir: join(resolve(), '/src/mail/templates'),
					adapter: new HandlebarsAdapter(),
					options: {
						strict: true,
					},
				},
			}),
		}),
	],
	providers: [MailService],
	exports: [MailService],
})
export class MailModule {}
