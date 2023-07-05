import { IsInt, IsPositive } from 'class-validator';

export class FindAllProjectsDto {
	@IsInt()
	@IsPositive()
	take: number;

	@IsInt()
	@IsPositive()
	skip: number;
}
