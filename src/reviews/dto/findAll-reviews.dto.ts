import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumberString } from 'class-validator';

export class FindAllReviewsDto {
	@ApiPropertyOptional({ default: 0 })
	@IsOptional()
	@IsNumberString({ no_symbols: true })
	offset?: number;

	@ApiPropertyOptional({ default: 12 })
	@IsOptional()
	@IsNumberString({ no_symbols: true })
	count?: number;
}
