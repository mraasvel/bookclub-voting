import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vote } from './vote.entity';

// one to many relation with votes

// todo: add creator/author relation
@Entity()
export class Poll {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column("text", { array: true })
	options: string[];

	@OneToMany(() => Vote, (vote: Vote) => vote.poll, {
		eager: true,
	})
	votes: Vote[];
}
