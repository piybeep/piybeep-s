import {
	Column,
	CreateDateColumn,
	PrimaryGeneratedColumn,
	Entity,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class Project {
	@ApiProperty()
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty()
	@Column({ type: 'varchar' })
	title: string;

	@ApiProperty()
	@Column({ type: 'varchar' })
	customer: string;

	@ApiProperty()
	@Column({ type: 'varchar', nullable: true })
	access: string;

	@ApiProperty()
	@Column({ type: 'varchar', nullable: true })
	link: string;

	@ApiProperty()
	@Column({ type: 'varchar', nullable: true })
	task: string;

	@ApiProperty()
	@Column({ type: 'varchar', nullable: true })
	about_company: string;

	@ApiProperty()
	@Column({ type: 'varchar', nullable: true })
	about_service: string;

	@ApiProperty()
	@Column({ type: 'text' })
	text: string;

	@ApiProperty()
	@CreateDateColumn()
	createdAt: Date;

	@ApiProperty()
	@CreateDateColumn()
	updatedAt: Date;
}
