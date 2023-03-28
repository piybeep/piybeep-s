import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsInt,
	IsNotEmpty,
	IsPositive,
	IsString,
	IsOptional,
	IsEnum,
	IsBoolean,
} from 'class-validator';
import { ServiceTypes } from './servicesTypes.enum';

export class CreateServiceDto {
	@ApiProperty({required: true})
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	description: string;

	@ApiProperty()
	@IsInt()
	@IsPositive()
	price: number;

	@ApiPropertyOptional()
	@IsOptional()
	@IsInt()
	@IsPositive()
	discount?: number;

	@ApiProperty()
	@IsInt()
	@IsPositive()
	typeId: number;

	@ApiPropertyOptional()
	@IsBoolean()
	isHide?: boolean;

	@ApiPropertyOptional()
	@IsBoolean()
	isAvailable?: boolean;
}
