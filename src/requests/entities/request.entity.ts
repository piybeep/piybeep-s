import { ApiProperty } from '@nestjs/swagger';
import { Service } from './../../services/entities/service.entity';
import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToMany,
	JoinTable,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { RequestStatuses } from './request.statuses.entity';

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
	@Column({type: 'uuid', default: 1})
	statusId: number;

	@ApiProperty()
	@CreateDateColumn()
	createdAt: Date;

	@ApiProperty()
	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToOne(() => RequestStatuses, (status) => status.requests)
	@JoinColumn({name: 'statusId'})
	status: RequestStatuses;
	
	@ManyToMany(() => Service, { eager: true, cascade: true })
	@JoinTable({name: 'requests-services'})
	services: Service[];
}
