import { ApiParam, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsBoolean,
	IsBooleanString,
	IsEnum,
	IsOptional,
} from 'class-validator';

export enum availableSortingFields {
	name,
	price,
	discount,
}

export enum sort_direction {
	'ASC',
	'DESC',
}

export class FindOptions {
	@ApiPropertyOptional({
		description: 'Поля сортировки :"price", "name", "discount"',
	})
	@IsOptional()
	@IsEnum(availableSortingFields)
	sort_field: availableSortingFields;

	@ApiPropertyOptional({
		description:
			'Направление сортировки: ASC - по возрастанию, DESC - по убыванию',
	})
	@IsEnum(sort_direction)
	@IsOptional()
	sort_direction: sort_direction;

	@ApiPropertyOptional({
		description:
			'Если false, исключение недоступных товаров,  иначе если true, все товары',
	})
	@IsBooleanString()
	@IsOptional()
	available: boolean;

	@ApiPropertyOptional({
		description:
			'Если false, исключение скрытых товаров,  иначе если true, все товары',
	})
	@IsBooleanString()
	@IsOptional()
	hide: boolean;
}
