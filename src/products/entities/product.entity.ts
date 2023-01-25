import { ApiProperty } from '@nestjs/swagger';
import {
	Column,
	CreateDateColumn,
	Entity,
	UpdateDateColumn,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
	@ApiProperty()
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty()
	@Column('varchar', { unique: true })
	name: string;

	@ApiProperty()
	@Column('varchar')
	description: string;

	@ApiProperty()
	@Column()
	price: number;

	@ApiProperty()
	@Column()
	discount: number;

	@ApiProperty()
	@CreateDateColumn()
	createdAt: Date;

	@ApiProperty()
	@UpdateDateColumn()
	updatedAt: Date;
}
