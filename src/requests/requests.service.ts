import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MailService } from '../mail/mail.service';

import { Request } from './entities/request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { FindAllRequestsDto } from './dto/findAll-requests.dto';

@Injectable()
export class RequestsService {
	constructor(
		@InjectRepository(Request) private requestsRepos: Repository<Request>,
		private mailService: MailService,
	) {}

	async create(createRequestDto: CreateRequestDto) {
		const _request = this.requestsRepos.create(createRequestDto);
		const request = await this.requestsRepos.save(_request);
		await this.mailService.sendRequestNotification(request);
		this.mailService.sendTelegramNotification(
			['427307974', '1060394414', '1224772856'],
			request,
		);
		return request;
	}

	findAll(options: FindAllRequestsDto) {
		const take = options.count ?? 12;
		const skip = options.offset ?? 0;

		return this.requestsRepos.findAndCount({ take, skip });
	}
}
