import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
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
	create(payload: CreateServiceDto) {
		try {
			return this.ServiceRepos.create(payload);
		} catch (err) {
			console.log('Services.create', err);
			return new Error('Server error');
		}
	}

	findAll(options: FindOptions) {
		try {
      console.log(options)
		} catch (err) {
			console.log('Services.findAll', err);
			return Error('Server error');
		}
	}

	findOne(id: number) {
		return `This action returns a #${id} service`;
	}

	update(id: number, updateServiceDto: UpdateServiceDto) {
		return `This action updates a #${id} service`;
	}

	remove(id: number) {
		return `This action removes a #${id} service`;
	}
}
