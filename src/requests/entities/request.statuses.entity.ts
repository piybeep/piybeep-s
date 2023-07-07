import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Request } from './request.entity';

@Entity('request_statuses')
export class RequestStatuses {
	@ApiProperty()
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty()
	@Column()
	status_title: string;

    @OneToMany(()=>Request, (request)=>request.status)
    requests:Request[]  
}
