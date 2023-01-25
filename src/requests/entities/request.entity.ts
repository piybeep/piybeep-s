import { ApiProperty } from '@nestjs/swagger';
import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
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
	product: string;

	@ApiProperty()
	@CreateDateColumn()
	createdAt: Date;
}
