import { ApiProperty } from '@nestjs/swagger';
import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToMany,
} from 'typeorm';


@Entity()
export class Request {
	@ApiProperty()
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty()
	@Column('varchar')
	name: string;

	@ApiProperty()
	@Column('varchar')
	contact: string;

	@ApiProperty()
	@Column('varchar')
	status: string;

	// @ManyToMany(() => Service, {eager: true})
	// @JoinTable()
	// select: Service[];

	@ApiProperty()
	@CreateDateColumn()
	createdAt: Date;
}
