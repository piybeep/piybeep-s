import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateRequestDto } from './dto/create-request.dto';
import { FindAllRequestsDto } from './dto/findAll-requests.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './entities/request.entity';
import { RequestsService } from './requests.service';

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
	updateStatus(@Param('id') id: string, @Body() payload: UpdateRequestDto) {
		return this.requestsService.update(id, payload);
	}

}
