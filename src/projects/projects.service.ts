import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { FindAllProjectsDto } from './dto/find-all-projects.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
	constructor(
		@InjectRepository(Project)
		private projectRepository: Repository<Project>,
	) {}

	async create(createProjectDto: CreateProjectDto) {
		try {
			const created_project =
				this.projectRepository.save(createProjectDto);
			return created_project;
		} catch (err) {
			console.log('project.service.create', err);
			throw new Error('Server error');
		}
	}

	findAll(take: number, skip: number) {
		return this.projectRepository.findAndCount({take, skip});
	}

	findOne(id: string) {
		return this.projectRepository.findOneBy({ id });
	}

	update(id: string, updateProjectDto: UpdateProjectDto) {
		return this.projectRepository.update({ id }, updateProjectDto);
	}

	remove(id: string) {
    return this.projectRepository.delete({id})
  }
}
