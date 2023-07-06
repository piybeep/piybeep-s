import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
	IsBooleanString,
	IsEnum,
	IsNumber,
	IsOptional,
	IsPort,
	IsPositive,
} from 'class-validator';

export enum availableSortingFields {
	name = 'name',
	price = 'price',
	discount = 'discount',
	createdAt = 'createdAt',
	updatedAt = 'updatedAt',
}

export enum sort_direction {
	ASC = 'ASC',
	DESC = 'DESC',
}

export class FindOptions {
	@ApiPropertyOptional({
		example: 'price',
		default: 'name',
		description: 'Поля сортировки :"price", "name", "discount"',
	})
	@IsOptional()
	@IsEnum(availableSortingFields)
	sort_field?: availableSortingFields;

	@ApiPropertyOptional({
		example: 'DESC',
		default: 'ASC',
		description:
			'Направление сортировки: ASC - по возрастанию, DESC - по убыванию',
	})
	@IsEnum(sort_direction)
	@IsOptional()
	sort_direction?: sort_direction;

	@ApiPropertyOptional({
		example: true,
		default: false,
		description:
			'Если false, исключение недоступных товаров,  иначе если true, все товары',
	})
	@IsBooleanString()
	@IsOptional()
	isNotAvailable?: string;

	@ApiPropertyOptional({
		example: true,
		default: false,
		description:
			'Если false, исключение скрытых товаров,  иначе если true, все товары',
	})
	@IsBooleanString()
	@IsOptional()
	isHide?: string;

	@ApiPropertyOptional({
		example: 10,
		default: 12,
		description: 'Количество элементов страницы'
	})
	@IsOptional()
	@Type(()=>Number)
	@IsNumber()
	@IsPositive()
	count: number

	@ApiPropertyOptional({
		example: 1,
		default: 0,
		description: 'Номер страницы'
	})
	@IsOptional()
	@Type(()=>Number)
	@IsNumber()
	page: number

	constructor(count = 12, page = 0) {
		this.count = count
		this.page = page
	}
}
