import { ApiProperty, PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';
import {
	IsString,
	IsNotEmpty,
	IsInt,
	IsPositive,
	IsOptional,
	IsEnum,
	IsBoolean,
} from 'class-validator';
import { ServiceTypes } from './servicesTypes.enum';

export class UpdateServiceDto {
	@ApiPropertyOptional()
	@IsString()
    @IsOptional()
	@IsNotEmpty()
	name?: string;

	@ApiPropertyOptional()
    @IsOptional()
	@IsString()
	@IsNotEmpty()
	description?: string;

	@ApiPropertyOptional()
    @IsOptional()
	@IsInt()
	@IsPositive()
	price?: number;

	@ApiPropertyOptional()
	@IsOptional()
    @IsOptional()
	@IsInt()
	@IsPositive()
	discount?: number;

	@ApiPropertyOptional()
    @IsOptional()
	@IsInt()
	@IsPositive()
	typeId?: number;

	@ApiPropertyOptional()
    @IsOptional()
	@IsBoolean()
	isHide?: boolean;

	@ApiPropertyOptional()
    @IsOptional()
	@IsBoolean()
	isAvailable?: boolean;
}
