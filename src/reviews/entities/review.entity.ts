import {
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Entity } from 'typeorm';

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
}
