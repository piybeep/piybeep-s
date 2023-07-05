import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Put,
	HttpStatus,
	HttpException,
	Query,
	BadRequestException,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FindAllProjectsDto } from './dto/find-all-projects.dto';
import { isEmpty } from 'class-validator';

@Controller('projects')
export class ProjectsController {
	constructor(private readonly projectsService: ProjectsService) {}

	@Post()
	create(@Body() createProjectDto: CreateProjectDto) {
		return this.projectsService.create(createProjectDto);
	}

	@Get()
	findAll(@Query() query: FindAllProjectsDto) {
		return this.projectsService.findAll(query.take, query.skip);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.projectsService.findOne(id);
	}

	@Put(':id')
	update(
		@Param('id') id: string,
		@Body() updateProjectDto: UpdateProjectDto,
	) {
		if (isEmpty(updateProjectDto)) {
			throw new BadRequestException('body must be not empty');
		}
		return this.projectsService.update(id, updateProjectDto);
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		const { affected } = await this.projectsService.remove(id);
		if (affected > 0) {
			return { message: 'OK' }; //new HttpException('OK',HttpStatus.OK);
		} else {
			throw new HttpException('Error on delete', HttpStatus.BAD_REQUEST);
		}
	}
}
