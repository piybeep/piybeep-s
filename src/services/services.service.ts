import { In, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { FindOptions } from './dto/findOptions.dto';

@Injectable()
export class ServicesService {
	constructor(
		@InjectRepository(Service)
		private readonly ServiceRepos: Repository<Service>,
	) {}

	async create(payload: CreateServiceDto) {
		try {
			const _service = this.ServiceRepos.create(payload);
			return this.ServiceRepos.save(_service);
		} catch (err) {
			console.log('Services.create', err);
			return new Error('Server error');
		}
	}

	async findAll(options: FindOptions) {
		try {
			const hideOpts =
				options.isHide === 'true' ? [false, true] : [false];
			const availableOpts =
				options.isNotAvailable === 'true' ? [false, true] : [true];

			return await this.ServiceRepos.find({
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
			});
		} catch (err) {
			console.log('Services.findAll', err);
			return Error('Server error');
		}
	}

	async findOne(id: string) {
		return await this.ServiceRepos.findOneBy({ id });
	}

	async update(id: string, updateServiceDto: UpdateServiceDto) {
		try {
			const entity: Service = await this.ServiceRepos.findOneBy({ id });
			if (entity === null) {
				throw new NotFoundException(`Service not found `);
			} else {
				const result = await this.ServiceRepos.update(
					{ id },
					updateServiceDto,
				);
				if (result.affected === 0) {
					throw new Error('update failed');
				} else {
					return await this.ServiceRepos.findOneBy({ id });
				}
			}
		} catch (err) {
			return err.response;
		}
	}

	async remove(id: string) {
		try {
			const service = await this.ServiceRepos.findOneBy({ id });
			if (!service) {
				throw new NotFoundException(`Service not found`);
			}
			await this.ServiceRepos.remove(service);
			return { message: 'OK' };
		} catch (err) {
			return err.response;
		}
	}
}
