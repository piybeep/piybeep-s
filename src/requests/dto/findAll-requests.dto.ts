import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumberString, IsString } from 'class-validator';

export class FindAllRequestsDto {
	@ApiPropertyOptional({ default: 0 })
	@IsOptional()
	@IsNumberString({ no_symbols: true })
	offset?: number;

	@ApiPropertyOptional({ default: 12 })
	@IsOptional()
	@IsNumberString({ no_symbols: true })
	count?: number;

	@ApiPropertyOptional({ default: 'createdAt:ASC' })
	@IsOptional()
	@IsString()
	sort?: string;
}
