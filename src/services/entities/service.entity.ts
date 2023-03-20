import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ServiceTypes } from '../dto/servicesTypes.enum';

@Entity('Services')
export class Service {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	price: number;

	@Column({ nullable: true })
	discount: number;

	@Column({ type: 'enum', enum: ServiceTypes, default: ServiceTypes.Product })
	type: ServiceTypes;

	@Column({ default: false })
	isHide: boolean;

	@Column({ default: true })
	isAvailable: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
