import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
	IsArray,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID
} from 'class-validator';

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
	@IsString()
	@IsUUID()
	statusId?: string;

	@ApiProperty()
	@IsOptional()
	@IsArray()
	services?: [string];
}
