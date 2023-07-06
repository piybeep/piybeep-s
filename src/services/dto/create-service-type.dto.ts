import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateServiceTypeDto {
	@ApiProperty()
	@IsString()
	name: string;
}
