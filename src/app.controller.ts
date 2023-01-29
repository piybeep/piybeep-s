import { Body, Controller, Post } from '@nestjs/common';
import { CreateRequestDto } from './requests/dto/create-request.dto';
import { RequestsService } from './requests/requests.service';

@Controller('feedback')
export class AppController {
	constructor(private readonly requestsService: RequestsService) {}

	@Post()
	create(@Body() createRequestDto: CreateRequestDto) {
		return this.requestsService.create(createRequestDto);
	}
}
