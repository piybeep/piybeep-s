import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { MailService } from '../mail/mail.service';

import { Request } from './entities/request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { FindAllRequestsDto } from './dto/findAll-requests.dto';
import { requestStatuses } from './dto/requestStatuses.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

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

		const order = options.sort?.split(':');

		return this.requestsRepos.findAndCount({
			take,
			skip,
			order: Object.assign(
				{},
				order.length && {
					[order[0]]: order[1] ?? 'asc',
				},
			),
		});
	}

	async updateStatus(id: string, status: string) {
		try {
			if (!requestStatuses.includes(status)) {
				throw new Error(
					'Invlaid status\nUse this statuses: "new", "in process", "completed"',
				);
			} else {
				await this.requestsRepos.update(id, { status });
				return { message: 'OK' };
			}
		} catch (err) {
			console.log('requests.service.updateStatus', err);
			return new Error('Server error');
		}
	}

	async update(id: string, options: UpdateRequestDto) {
		try {
			const result: UpdateResult = await this.requestsRepos.update(
				id,
				options,
			);
			if (result.affected > 0) {
				return { message: 'OK' };
			} else {
				return Error('Invalid id param');
			}
		} catch (err) {
			console.log('requests.service.update', err);
			return new Error('Server error');
		}
	}
}
