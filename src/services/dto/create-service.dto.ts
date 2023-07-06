import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsBoolean,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsPositive,
	IsString,
	IsUUID
} from 'class-validator';

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
	@IsUUID()
	@IsString()
	typeId: string;

	@ApiPropertyOptional()
	@IsBoolean()
	isHide?: boolean;

	@ApiPropertyOptional()
	@IsBoolean()
	isAvailable?: boolean;
}
