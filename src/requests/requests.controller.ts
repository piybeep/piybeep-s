import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
	ApiOkResponse,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';

import { CreateRequestDto } from './dto/create-request.dto';
import { FindAllRequestsDto } from './dto/findAll-requests.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './entities/request.entity';
import { RequestStatuses } from './entities/request.statuses.entity';
import { RequestsService } from './requests.service';

@ApiTags('Requests')
@Controller('requests')
export class RequestsController {
	constructor(private readonly requestsService: RequestsService) {}

	@ApiOperation({ summary: 'Получение всех статусов' })
	@ApiResponse({ status: 200, type: RequestStatuses })
	@Get('statuses')
	async getStatuses() {
		return await this.requestsService.getAllStatuses();
	}

	@ApiOperation({ summary: 'Создание заявки' })
	@ApiResponse({ status: 201, type: Request })
	@Post()
	async create(@Body() createRequestDto: CreateRequestDto) {
		return await this.requestsService.create(createRequestDto);
	}

	@ApiOperation({ summary: 'Получение всех заявок' })
	@ApiResponse({ status: 200, type: Request, isArray: true })
	@Get()
	async findAll(@Query() options: FindAllRequestsDto) {
		return await this.requestsService.findAll(options);
	}

	@ApiOperation({ summary: 'Обновление данных заявки' })
	@ApiResponse({ status: 200, type: Request })
	@Put(':id')
	async updateStatus(
		@Param('id') id: string,
		@Body() payload: UpdateRequestDto,
	) {
		return await this.requestsService.update(id, payload);
	}
}
