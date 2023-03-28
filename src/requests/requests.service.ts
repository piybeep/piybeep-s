import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, UpdateResult } from 'typeorm';

import { MailService } from '../mail/mail.service';

import { Request } from './entities/request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { FindAllRequestsDto } from './dto/findAll-requests.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Service } from 'src/services/entities/service.entity';
import { ServicesService } from './../services/services.service';

@Injectable()
export class RequestsService {
	constructor(
		@InjectRepository(Request) private requestsRepos: Repository<Request>,
		private mailService: MailService,
		private servicesService: ServicesService,
	) {}

	async create(createRequestDto: CreateRequestDto) {
		const services: Service[] = await this.servicesService.findAllInArray(
			createRequestDto.select,
		);
		const _request = this.requestsRepos.create({
			...createRequestDto,
			services,
		});
		const request = await this.requestsRepos.save(_request);

		const requestPayload = {
			...request,
			services: request.services
				.map((service) => service.name)
				.join(', '),
		};
		await this.mailService.sendRequestNotification(requestPayload);
		this.mailService.sendTelegramNotification(
			// ['427307974', '1060394414', '1224772856'],
			['986260036'],
			requestPayload,
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
				!!order?.length && {
					[order[0]]: order[1] ?? 'asc',
				},
			),
		});
	}

	findOne(id: string) {
		return this.requestsRepos.findOneBy({ id });
	}
	async update(id: string, options: UpdateRequestDto) {
		try {
			let services: Service[];

			const result: UpdateResult = await this.requestsRepos.update(
				id,
				options
			);
			if (!!options.services) {
				services = await this.servicesService.findAllInArray(
					options.services,
				);
			}
			if (result.affected > 0) {
				return await this.findOne(id);
			} else {
				return Error('Invalid id param');
			}
		} catch (err) {
			console.log('requests.service.update', err);
			return new Error('Server error');
		}
	}
}
