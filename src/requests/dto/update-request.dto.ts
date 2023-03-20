import { ApiProperty } from '@nestjs/swagger';
import { TransformFnParams, Transform, Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested, Validate } from 'class-validator';

export class UpdateRequestDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Вы не ввели имя' })
	@IsOptional()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	name?: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Вы не ввели контактные данные' })
	@Transform(({ value }: TransformFnParams) => value?.trim())
	@IsOptional()
	contact?: string;

	@ApiProperty()
	@IsOptional()
	@IsArray()
	select?: string[];
}
