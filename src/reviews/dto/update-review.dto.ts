import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateReviewDto } from './create-review.dto';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	author: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	text: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	project_id: string;
}
