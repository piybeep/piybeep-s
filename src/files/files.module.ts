import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { extname, join, resolve } from 'path';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([File]),
		MulterModule.registerAsync({
			useFactory: async () => ({
				dest: join(resolve(), 'dist', 'static'),
				storage: diskStorage({
					destination: (req, file, cb) => {
						const uploadPath = join(resolve(), 'dist', 'static');

						if (!existsSync(uploadPath)) {
							mkdirSync(uploadPath);
						}

						cb(null, uploadPath);
					},
					filename: (req, file, cb) => {
						const randomName = Array(6)
							.fill(null)
							.map(() =>
								Math.round(Math.random() * 16).toString(16),
							);
						randomName.unshift(`${Date.now()}`, '-');
						const newName = randomName.join('');
						cb(null, `${newName}${extname(file.originalname)}`);
					},
				}),
			}),
		}),
	],
	providers: [FilesService],
	controllers: [FilesController],
})
export class StaticModule {}
