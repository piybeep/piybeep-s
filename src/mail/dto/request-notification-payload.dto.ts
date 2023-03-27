import { Service } from './../../services/entities/service.entity';

export class RequestNotificationPaylaod {
	id: string;
	name: string;
	contact: string;
	select: Service[];
}
