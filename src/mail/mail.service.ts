import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as https from 'node:https';

import { RequestNotificationPaylaod } from './dto/request-notification-payload.dto';

@Injectable()
export class MailService {
	constructor(
		private mailerService: MailerService,
		private configServive: ConfigService,
	) {}

	async sendRequestNotification(payload: RequestNotificationPaylaod) {
		return this.mailerService.sendMail({
			to: this.configServive.get('WORK_MAIL'),
			subject: 'Новая заявка',
			template: 'request',
			context: {
				...payload,
				id:
					typeof payload.id == 'number'
						? payload.id
						: payload.id.split('-')[0],
			},
		});
	}

	async sendTelegramNotification(
		to: string[],
		payload: RequestNotificationPaylaod,
	) {
		const token = this.configServive.get('TELEGRAM_BOT_TOKEN');
		if (!token)
			return console.log(
				`[${new Date().toLocaleString()}] sendTelegramNotification: token is undefined`,
			);

		const message =
			'<b>Новая заявка</b>%0A%0AИмя: ' +
			payload.name +
			'%0AСвязь: ' +
			payload.contact +
			'%0AВыбор: ' +
			payload.product +
			'%0A%0A<code>' +
			(typeof payload.id == 'number'
				? payload.id
				: payload.id.split('-')[0]) +
			'</code>';

		to.map((target) =>
			https
				.get(
					`https://api.telegram.org/bot${token}/sendMessage?chat_id=${target}&text=${message}&parse_mode=HTML`,
					(res) =>
						console.log(
							`[${new Date().toLocaleString()}] Sending message to ${target}: ${
								res.statusMessage
							}`,
						),
				)
				.on('error', (err) =>
					console.error(`[${new Date().toLocaleString()}]`, err),
				),
		);
	}
}
