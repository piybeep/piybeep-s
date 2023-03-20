import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('requests-services')
export class RequestsServices {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	service_id: string;

	@Column()
	request_id: string;

    @CreateDateColumn()
    createdAt: Date
}
