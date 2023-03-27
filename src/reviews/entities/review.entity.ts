import {
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Entity } from 'typeorm';
import { Project } from './../../projects/entities/project.entity';

@Entity()
export class Review {
	@ApiProperty()
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty()
	@Column('varchar')
	author: string;

	@ApiProperty()
	@Column('varchar')
	text: string;

	@ApiProperty()
	@CreateDateColumn()
	createdAt: Date;
	@ApiProperty()
	@UpdateDateColumn()
	updatedAt: Date;

	@ApiProperty()
	@Column()
	project_id?: string;

	@ManyToOne(()=>Project, (project)=>project.reviews)
	project: Project
}
