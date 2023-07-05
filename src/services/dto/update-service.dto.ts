import { ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsString,
	IsNotEmpty,
	IsInt,
	IsPositive,
	IsOptional,
	IsBoolean,
} from 'class-validator';

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
