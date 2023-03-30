import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, UpdateResult } from 'typeorm';

import { MailService } from '../mail/mail.service';

import { Request } from './entities/request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { FindAllRequestsDto } from './dto/findAll-requests.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Service } from 'src/services/entities/service.entity';
import { ServicesService } from './../services/services.service';
import { RequestStatuses } from './entities/request.statuses.entity';

@Injectable()
export class RequestsService {
	constructor(
		@InjectRepository(Request) private requestsRepos: Repository<Request>,
		@InjectRepository(RequestStatuses) private requestStatusesRepos: Repository<RequestStatuses>,
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
			saveObj.services = _services
		}
		if(!!options.statusId){
			const status = await this.getServiceStatus(options.statusId)
			if(!status) throw new BadRequestException('invalid statusId param')
			saveObj.status = status
		}

		return await this.requestsRepos.save(saveObj);
	}

	async getServiceStatus(id: number){
		return await this.requestStatusesRepos.findOneBy({id})
	}
}
