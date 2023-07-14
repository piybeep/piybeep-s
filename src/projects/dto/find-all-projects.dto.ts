import { IsNumberString } from 'class-validator';

export class FindAllProjectsDto {
	@IsNumberString()
	take: number;

	@IsNumberString()
	skip: number;
}
