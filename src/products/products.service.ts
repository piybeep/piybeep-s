import { Injectable } from '@nestjs/common';
import { FindAllProductsDto } from './dto/findAll-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
	constructor(
		@InjectRepository(Product) private productRepos: Repository<Product>,
	) {}

	findAll(options: FindAllProductsDto) {
		const take = options.count ?? 12;
		const skip = options.offset ?? 0;

		return this.productRepos.findAndCount({ take, skip });
	}

	findOne(id: string) {
		return this.productRepos.findOne({ where: { id } });
	}
}
