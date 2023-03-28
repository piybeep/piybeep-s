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

	async findAllInArray(arrayUUID: string[]) {
		return await this.ServiceRepos.find({ where: { id: In(arrayUUID) } });
	}

	async findAll(options: FindOptions) {
		try {
			const hideOpts = [false];
			const availableOpts = [true];

			if (options.isHide === 'true') {
				hideOpts.push(true);
			}
			if (options.isNotAvailable === 'true') {
				availableOpts.push(false);
			}
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
		const result: Service = await this.ServiceRepos.findOneBy({ id });
		return result === null ? 'null' : result;
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
					return { message: 'OK' };
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
