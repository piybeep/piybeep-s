import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Service } from './service.entity';

@Entity('ServiceTypes')
export class ServiceTypes {
	@ApiProperty({
		example: '9404be2c-3837-491a-bd62-3a5b387ac111',
		description: 'Уникальный id типа',
	})
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty({ example: 'product', description: 'Уникальное имя типа' })
	@Column({ unique: true })
	name: string;

	@OneToMany(() => Service, (services) => services.type, {
		onDelete: 'SET NULL',
	})
	services: Service[];
}
