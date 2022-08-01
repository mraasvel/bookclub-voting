import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// one to many relation with votes

@Entity()
export class Poll {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column("text", { array: true })
	options: string[];
}
