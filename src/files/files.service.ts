import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';
import { FindAllFilesDto } from './dto/findAll-files.dto';

@Injectable()
export class FilesService {
	constructor(@InjectRepository(File) private fileRepos: Repository<File>) {}

	async create(file: Express.Multer.File) {
		const uploaded = this.fileRepos.create({
			name: file.filename,
			type: file.mimetype,
			size: file.size,
		});
		return this.fileRepos.save(uploaded);
	}

	async findAll(options: FindAllFilesDto) {
		const take = options.count ?? 12;
		const skip = options.offset ?? 0;

		return this.fileRepos.findAndCount({ take, skip });
	}
}
