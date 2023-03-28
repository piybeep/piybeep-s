import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	ParseUUIDPipe,
	Put,
	UseFilters,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { FindOptions } from './dto/findOptions.dto';
import {
	ApiBody,
	ApiParam,
	ApiQuery,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
	constructor(private readonly servicesService: ServicesService) {}

	@ApiBody({ type: CreateServiceDto })
	@Post()
	@ApiResponse({ status: 200, description: 'created' })
	create(@Body() payload: CreateServiceDto) {
		return this.servicesService.create(payload);
	}
	@ApiResponse({ status: 200, description: 'ok' })
	@Get()
	findAll(@Query() options: FindOptions) {
		return this.servicesService.findAll(options);
	}

	@ApiParam({
		name: 'id',
		description: 'id услуги',
	})
	@Get(':id')
	findOne(@Param('id', ParseUUIDPipe) id: string) {
		return this.servicesService.findOne(id);
	}

	@ApiBody({ type: UpdateServiceDto })
	@ApiParam({ name: 'id', description: 'id услуги' })
	@Put(':id')
	update(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() updateServiceDto: UpdateServiceDto,
	) {
		return this.servicesService.update(id, updateServiceDto);
	}
	
	@ApiParam({ name: 'id', description: 'id услуги' })
	@Delete(':id')
	remove(@Param('id', ParseUUIDPipe) id: string) {
		return this.servicesService.remove(id);
	}
}
