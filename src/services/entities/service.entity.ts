import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ServiceTypes } from './service-types.entity';

@Entity('services')
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

	@Column({ default: false })
	isHide: boolean;

	@Column({ default: true })
	isAvailable: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToOne(() => ServiceTypes, (type) => type.services)
	type: ServiceTypes;
}
