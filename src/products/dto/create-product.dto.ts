import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import {
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsPositive,
	IsString,
} from 'class-validator';

export class CreateProductDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	description?: string;

	@IsInt()
	@IsPositive()
	@ApiProperty()
	price: number;

	@IsOptional()
	@IsInt()
	@IsPositive()
	@ApiPropertyOptional()
	discount?: number;
}
