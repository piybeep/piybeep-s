import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { Repository } from 'typeorm';
import { FindAllRequestsDto } from './dto/findAll-requests.dto';

@Injectable()
export class RequestsService {
	constructor(
		@InjectRepository(Request) private requestsRepos: Repository<Request>,
	) {}
	create(createRequestDto: CreateRequestDto) {
		const request = this.requestsRepos.create(createRequestDto);
		return this.requestsRepos.save(request);
	}

	findAll(options: FindAllRequestsDto) {
		const take = options.count ?? 12;
		const skip = options.offset ?? 0;

		return this.requestsRepos.findAndCount({ take, skip });
	}
}
