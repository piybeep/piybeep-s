import { ApiProperty } from '@nestjs/swagger';
import { TransformFnParams, Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsArray, IsInt, IsPositive } from 'class-validator';

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
	@IsInt()
	@IsPositive()
	@IsOptional()
	statusId?: number
	
	@ApiProperty()
	@IsOptional()
	@IsArray()
	services?: [string];
}
