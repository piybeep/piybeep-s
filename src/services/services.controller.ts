import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import {
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import {
	CreateServiceDto,
	CreateServiceTypeDto,
	FindOptions,
	UpdateServiceDto,
} from './dto';
import { ServiceTypes } from './entities/service-types.entity';
import { Service } from './entities/service.entity';
import { ServicesService } from './services.service';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
	constructor(private readonly servicesService: ServicesService) {}

	@ApiOperation({ summary: 'Создание типа услуги' })
	@ApiResponse({ status: 201, type: ServiceTypes })
	@ApiBody({ type: CreateServiceTypeDto })
	@Post('types')
	async createTypes(@Body('name') name: string) {
		return await this.servicesService.createTypes(name);
	}

	@ApiOperation({ summary: 'Получение всех типов услуг' })
	@ApiResponse({ status: 200, type: ServiceTypes, isArray: true })
	@Get('types')
	async getTypes() {
		return await this.servicesService.findAllTypes();
	}

	@ApiOperation({ summary: 'Удаление типа услуг' })
	@ApiResponse({ status: 200, description: 'OK' })
	@Delete('types/:id')
	async removeTypes(@Param('id') id: string) {
		return await this.servicesService.removeTypes(id);
	}
	@ApiOperation({ summary: 'Создание услуги' })
	@ApiResponse({ status: 201, type: Service })
	@ApiBody({ type: CreateServiceDto })
	@Post()
	async create(@Body() payload: CreateServiceDto) {
		return await this.servicesService.create(payload);
	}
	@ApiOperation({
		summary: 'Поиск всех услуг с фильтрацией, сортировкой и пагинацией',
	})
	@ApiResponse({ status: 200, type: Service, isArray: true })
	@Get()
	@UsePipes(new ValidationPipe({ transform: true }))
	async findAll(@Query() options: FindOptions) {
		return await this.servicesService.findAll(options);
	}

	@ApiOperation({ summary: 'Получение услуги по id' })
	@ApiResponse({ status: 200, type: Service })
	@ApiParam({
		name: 'id',
		description: 'id услуги',
	})
	@Get(':id')
	async findOne(@Param('id', ParseUUIDPipe) id: string) {
		return await this.servicesService.findOne(id);
	}

	@ApiOperation({ summary: 'Обновление услуги' })
	@ApiResponse({ status: 200, type: Service })
	@ApiBody({ type: UpdateServiceDto })
	@ApiParam({ name: 'id', description: 'id услуги' })
	@Put(':id')
	async update(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() updateServiceDto: UpdateServiceDto,
	) {
		return await this.servicesService.update(id, updateServiceDto);
	}
	@ApiOperation({ summary: 'Удаление услуги' })
	@ApiResponse({ status: 200, description: 'OK' })
	@ApiParam({ name: 'id', description: 'id услуги' })
	@Delete(':id')
	async remove(@Param('id', ParseUUIDPipe) id: string) {
		return await this.servicesService.remove(id);
	}
}
