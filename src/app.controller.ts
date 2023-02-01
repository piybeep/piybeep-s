import { Body, Controller, Post } from '@nestjs/common';
import { CreateRequestDto } from './requests/dto/create-request.dto';
import { RequestsService } from './requests/requests.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('deprecated')
@Controller('feedback')
export class AppController {
	constructor(private readonly requestsService: RequestsService) {}

	@Post()
	create(@Body() createRequestDto: CreateRequestDto) {
		return this.requestsService.create(createRequestDto);
	}
}
