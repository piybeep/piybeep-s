import { Controller, Get, Post, Body, Query, Param, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { FindAllRequestsDto } from './dto/findAll-requests.dto';
import { Request } from './entities/request.entity';

@ApiTags('Requests')
@Controller('requests')
export class RequestsController {
	constructor(private readonly requestsService: RequestsService) {}

	@ApiCreatedResponse({ type: Request })
	@Post()
	create(@Body() createRequestDto: CreateRequestDto) {
		return this.requestsService.create(createRequestDto);
	}

	@ApiOkResponse({ type: Request, isArray: true })
	@Get()
	findAll(@Query() options: FindAllRequestsDto) {
		return this.requestsService.findAll(options);
	}

	@ApiOkResponse({ type: Request })
	@Put(':id')
	updateStatus(@Param('id') id: string, @Body() status: string) {
		return this.requestsService.updateStatus(id, status);
	}
}
