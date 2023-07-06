import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateServiceDto, FindOptions, UpdateServiceDto } from './dto';
import { ServiceTypes } from './entities/service-types.entity';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
	constructor(
		@InjectRepository(Service)
		private readonly ServiceRepos: Repository<Service>,
		@InjectRepository(ServiceTypes)
		private readonly ServiceTypesRepos: Repository<ServiceTypes>,
	) {}

	async create(payload: CreateServiceDto) {
		const { typeId, ...service } = payload;
		const type = await this.ServiceTypesRepos.findOneBy({
			id: typeId,
		});
		if (!type) throw new BadRequestException('No such service type');

		const _service = this.ServiceRepos.create({ ...service, type });
		await this.ServiceRepos.save(_service);
		return await this.ServiceRepos.findOne({
			where: { id: _service.id },
			relations: { type: true },
		});
	}

	async findAll(options: FindOptions) {
		const hideOpts = options.isHide === 'true' ? [false, true] : [false];
		const availableOpts =
			options.isNotAvailable === 'true' ? [false, true] : [true];

		const result: Service[] = await this.ServiceRepos.find({
			where: {
				isHide: In(hideOpts),
				isAvailable: In(availableOpts),
			},
			order: {
				[options.sort_field !== undefined
					? options.sort_field
					: 'name']:
					options.sort_direction !== undefined
						? options.sort_direction
						: 'ASC',
			},
			take: options.count,
			skip: options.page * options.count ?? 0,
		});
		return { data: result, page: options.page, count: options.count };
	}

	async findOne(id: string) {
		return await this.ServiceRepos.findOne({
			where: { id },
			relations: { type: true },
		});
	}

	async update(id: string, updateServiceDto: UpdateServiceDto) {
		const entity: Service = await this.ServiceRepos.findOneBy({ id });
		if (entity === null) {
			throw new NotFoundException(`Service not found `);
		} else {
			const result = await this.ServiceRepos.update(
				{ id },
				updateServiceDto,
			);
			if (result.affected !== 0) {
				return await this.ServiceRepos.findOneBy({ id });
			} else {
				throw new Error('update failed');
			}
		}
	}

	async remove(id: string) {
		const service = await this.ServiceRepos.findOneBy({ id });
		if (!service) {
			throw new NotFoundException(`Service not found`);
		}
		await this.ServiceRepos.remove(service);
		return { message: 'OK' };
	}

	async createTypes(name: string) {
		const typeExists = await this.ServiceTypesRepos.findOneBy({ name });
		if (typeExists) {
			throw new BadRequestException(`Type ${name} already exists`);
		}
		const type = this.ServiceTypesRepos.create({ name });
		return await this.ServiceTypesRepos.save(type);
	}

	async findAllTypes() {
		return await this.ServiceTypesRepos.find();
	}

	async removeTypes(id: string) {
		const type = await this.ServiceTypesRepos.findOneBy({ id });
		if (!type) throw new BadRequestException(`Could not find type`);
		const result = await this.ServiceTypesRepos.delete(type);
		if (result.affected !== 0) {
			return { message: 'OK' };
		} else {
			throw new InternalServerErrorException('Server error');
		}
	}
}
