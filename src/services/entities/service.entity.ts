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

	@Column({ nullable: true })
	typeId: string;

	@Column({ default: false })
	isHide: boolean;

	@Column({ default: true })
	isAvailable: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToOne(() => ServiceTypes, (type) => type.services, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'typeId' })
	type: ServiceTypes;
}
