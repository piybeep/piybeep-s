import { ApiProperty } from '@nestjs/swagger';
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class File {
	@ApiProperty()
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty()
	@Column('varchar')
	name: string;

	@ApiProperty()
	@Column('varchar')
	type: string;

	@ApiProperty()
	@Column({ unsigned: true })
	size: number;

	@ApiProperty()
	@CreateDateColumn()
	createdAt: Date;
}
