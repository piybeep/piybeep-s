import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllProductsDto } from './dto/findAll-product.dto';
import { Product } from './entities/product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@ApiOkResponse({ type: Product, isArray: true })
	@Get()
	findAll(@Query() options: FindAllProductsDto) {
		return this.productsService.findAll(options);
	}

	@ApiOkResponse({ type: Product })
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.productsService.findOne(id);
	}
}
