import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateProjectDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Название не должно быть пустым' })
	@Transform(({ value }: TransformFnParams) => value?.trim())
	title: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'поле Заказчика не должно быть пустым ' })
	@Transform(({ value }: TransformFnParams) => value?.trim())
	customer: string;

    @ApiPropertyOptional()
	@IsOptional()
	@IsString()
	@IsNotEmpty({ message: 'поле доступа не должно быть пустым' })
	@Transform(({ value }: TransformFnParams) => value?.trim())
	access?: string;

    @ApiPropertyOptional()
	@IsOptional()
	@IsString()
	@IsNotEmpty({ message: 'поле ссылки не должно быть пустым' })
	@Transform(({ value }: TransformFnParams) => value?.trim())
	link?: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	@IsNotEmpty({ message: 'задача проекта не должна быть пустой' })
	@Transform(({ value }: TransformFnParams) => value?.trim())
	task?: string;
	
    @ApiPropertyOptional()
	@IsOptional()
	@IsString()
	@IsNotEmpty({ message: 'поле о компании не должно быть пустым' })
	@Transform(({ value }: TransformFnParams) => value?.trim())
	about_company?: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	@IsNotEmpty({ message: 'поле о сервисе не должно быть пустым' })
	@Transform(({ value }: TransformFnParams) => value?.trim())
	about_service?: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'поле текст не должно быть пустым' })
	@Transform(({ value }: TransformFnParams) => value?.trim())
	text: string;
}
