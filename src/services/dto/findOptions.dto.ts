import { ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsBoolean,
	IsBooleanString,
	IsEnum,
	IsOptional,
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
}
