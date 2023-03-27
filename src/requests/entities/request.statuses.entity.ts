import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Request } from './request.entity';

@Entity('RequestStatuses')
export class RequestStatuses {
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty()
	@Column()
	status_title: string;

    @OneToMany(()=>Request, (request)=>request.status)
    requests:Request[]  
}
