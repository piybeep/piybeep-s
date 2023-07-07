import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ServiceTypes } from './service-types.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('services')
export class Service {
	@ApiProperty()
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty()
	@Column()
	name: string;

	@ApiProperty()
	@Column()
	description: string;

	@ApiProperty()
	@Column()
	price: number;

	@ApiProperty()
	@Column({ nullable: true })
	discount: number;

	@ApiProperty()
	@Column({ nullable: true })
	typeId: string;

	@ApiProperty()
	@Column({ default: false })
	isHide: boolean;

	@ApiProperty()
	@Column({ default: true })
	isAvailable: boolean;

	@ApiProperty()
	@CreateDateColumn()
	createdAt: Date;

	@ApiProperty()
	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToOne(() => ServiceTypes, (type) => type.services, {onDelete:'SET NULL'})
	@JoinColumn({ name: 'typeId' })
	type: ServiceTypes;
}
