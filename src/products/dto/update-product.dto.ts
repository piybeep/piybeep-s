import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import {
	IsString,
	IsOptional,
	IsNotEmpty,
	IsInt,
	IsPositive,
} from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	name?: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	description?: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsInt()
	@IsPositive()
	price?: number;

	@IsOptional()
	@IsInt()
	@IsPositive()
	@ApiPropertyOptional()
	discount?: number;
}
