import {
	Controller,
	Post,
	UseInterceptors,
	Get,
	Query,
	HttpException,
	HttpStatus,
	UploadedFile,
	Delete,
	ParseUUIDPipe,
	Param,
} from '@nestjs/common';
import {
	ApiBody,
	ApiConsumes,
	ApiTags,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiResponse,
	ApiParam,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { FilesService } from './files.service';
import { File } from './entities/file.entity';
import { FindAllFilesDto } from './dto/findAll-files.dto';

@ApiTags('Files')
@Controller('files')
export class FilesController {
	constructor(private filesService: FilesService) {}

	@ApiCreatedResponse({ type: File })
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				file: {
					nullable: false,
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('file'))
	@Post()
	uploadFile(@UploadedFile() file: Express.Multer.File) {
		if (!file)
			throw new HttpException(
				'Вы не прикрепили файл',
				HttpStatus.BAD_REQUEST,
			);
		return this.filesService.create(file);
	}

	@ApiOkResponse({ type: File, isArray: true })
	@Get()
	findAll(@Query() options: FindAllFilesDto) {
		return this.filesService.findAll(options);
	}

	@ApiParam({
		name: 'id',
		description: 'Id файла',
	})
	@ApiResponse({ status: 200, description: 'OK' })
	@Delete(':id')
	deleteFile(@Param('id', ParseUUIDPipe) id: string) {
		return this.filesService.deleteFromDB(id)
	}
}
