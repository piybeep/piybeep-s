import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReviewDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	author: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	text: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	project_id: string;
}
