import { ApiProperty } from '@nestjs/swagger';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Service } from './../../services/entities/service.entity';
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

	@ManyToOne(() => RequestStatuses, (status) => status.requests, {eager: true})
	@JoinColumn({name: 'statusId'})
	status: RequestStatuses;
	
	@ManyToMany(() => Service, { eager: true, cascade: true })
	@JoinTable({name: 'requests-services'})
	services: Service[];
}
