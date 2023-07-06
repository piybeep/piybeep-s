import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Service } from './service.entity';

@Entity('ServiceTypes')
export class ServiceTypes {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@OneToMany(() => Service, (services) => services.type, {
		onDelete: 'CASCADE',
	})
	services: Service[];
}
