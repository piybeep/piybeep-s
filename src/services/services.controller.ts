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
import { CreateServiceDto } from './dto/create-service.dto';
import { FindOptions } from './dto/findOptions.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { ServicesService } from './services.service';
import { ServiceTypes } from './entities/service-types.entity';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
	constructor(private readonly servicesService: ServicesService) {}

	@ApiOperation({ summary: 'Создание типа услуги' })
	@ApiResponse({ status: 201, type: ServiceTypes })
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

	@Get()
	@UsePipes(new ValidationPipe({ transform: true }))
	async findAll(@Query() options: FindOptions) {
		return await this.servicesService.findAll(options);
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
	async remove(@Param('id', ParseUUIDPipe) id: string) {
		return await this.servicesService.remove(id);
	}
}
