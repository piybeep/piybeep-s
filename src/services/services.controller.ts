import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { FindOptions } from './dto/findOptions.dto';

@Controller('services')
export class ServicesController {
	constructor(private readonly servicesService: ServicesService) {}

	@Post()
	create(@Body() payload: CreateServiceDto) {
		return this.servicesService.create(payload);
	}

	@Get()
	findAll(
		@Query('options')
		options: FindOptions,
	) {
		return this.servicesService.findAll(options);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.servicesService.findOne(+id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateServiceDto: UpdateServiceDto,
	) {
		return this.servicesService.update(+id, updateServiceDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.servicesService.remove(+id);
	}
}
