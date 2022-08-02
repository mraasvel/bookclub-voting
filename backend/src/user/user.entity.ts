import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import Role from './role.enum';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	public id: number;

	@Exclude()
	@Column()
	public intraId: string;

	@Column({ unique: true })
	public username: string;

	@Column({
		type: 'enum',
		enum: Role,
		default: Role.User,
	})
	public role: Role;
}
