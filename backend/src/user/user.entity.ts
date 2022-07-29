import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
  } from 'typeorm';
import { Exclude } from 'class-transformer';
  
@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Exclude()
	@Column()
	intraId: string;
  
	@Column({ unique: true, nullable: true })
	username: string;
}
