import { ApiProperty } from '@nestjs/swagger';
import { TransformFnParams, Transform } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRequestDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Вы не ввели имя' })
	@Transform(({ value }: TransformFnParams) => value?.trim())
	name: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Вы не ввели контактные данные' })
	@Transform(({ value }: TransformFnParams) => value?.trim())
	contact: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Вы не выбрали продукт(-ы)' })
	@Transform(({ value }: TransformFnParams) => value?.trim())
	product: string;
}
