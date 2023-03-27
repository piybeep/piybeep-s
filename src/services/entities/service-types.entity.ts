import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Service } from './service.entity';

@Entity('ServiceTypes')
export class ServiceTypes {
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	type: string;

	@OneToMany(() => Service, (services) => services.type)
	services: Service[];
}
