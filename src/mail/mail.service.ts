import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
}
