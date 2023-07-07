import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MailService } from '../mail/mail.service';

import { Service } from 'src/services/entities/service.entity';
import { ServicesService } from './../services/services.service';

import { Request } from './entities/request.entity';
import { RequestStatuses } from './entities/request.statuses.entity';
import { CreateRequestDto, FindAllRequestsDto, UpdateRequestDto } from './dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RequestsService {
	constructor(
		@InjectRepository(Request) private requestsRepos: Repository<Request>,
		@InjectRepository(RequestStatuses)
		private requestStatusesRepos: Repository<RequestStatuses>,
		private mailService: MailService,
		private servicesService: ServicesService,
		private configService: ConfigService,
	) {}

	async create(createRequestDto: CreateRequestDto) {
		const services: Service[] = await this.servicesService.findAllInArray(
			createRequestDto.select,
		);
		const _request = this.requestsRepos.create({
			...createRequestDto,
			services,
			status: await this.requestStatusesRepos.findOneBy({
				status_title: 'new',
			}),
		});
		const request = await this.requestsRepos.save(_request);

		const requestPayload = {
			...request,
			services: request.services
				.map((service) => service.name)
				.join(', '),
		};
		await this.mailService.sendRequestNotification(requestPayload);
		await this.mailService.sendTelegramNotification(
			this.configService.get('NODE_ENV')=='dev' ? ['986260036'] :  ['427307974', '1060394414', '1224772856'],
			requestPayload,
		);
		return request;
	}

	async findAll(options: FindAllRequestsDto) {
		const take = options.count ?? 12;
		const skip = options.offset ?? 0;

		const order = options.sort?.split(':');

		const requests = await this.requestsRepos.findAndCount({
			take,
			skip,
			order: Object.assign(
				{},
				!!order?.length && {
					[order[0]]: order[1] ?? 'asc',
				},
			),
		});
		return { data: requests[0], count: requests[1] };
	}

	async findOne(id: string) {
		return await this.requestsRepos.findOneBy({ id });
	}

	async update(id: string, options: UpdateRequestDto) {
		const request: Request = await this.requestsRepos.findOneBy({ id });
		if (!request) {
			throw new BadRequestException(`request ${id} not found`);
		}
		const { services, ..._opts } = options;

		const saveObj: Request = { ...request, ..._opts };
		if (!!options.services) {
			const _services = await this.servicesService.findAllInArray(
				services,
			);
			if (!_services || _services.length === 0) {
				throw new BadRequestException('invalid services param');
			}
			saveObj.services = _services;
		}
		if (!!options.statusId) {
			const status = await this.getServiceStatus(options.statusId);
			if (!status)
				throw new BadRequestException('invalid statusId param');
			saveObj.status = status;
		}

		return await this.requestsRepos.save(saveObj);
	}

	async getServiceStatus(id: string) {
		return await this.requestStatusesRepos.findOneBy({ id });
	}

	async getAllStatuses() {
		return await this.requestStatusesRepos.find();
	}
}
