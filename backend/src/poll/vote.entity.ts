import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Poll } from './poll.entity';

// Vote will be rated 1-5
// It has a relation to the user who made it (many votes to one user)
// and a many to one relation with the poll it belongs to

@Entity()
export class Vote {
	@PrimaryColumn()
	@ManyToOne(() => User, (user: User) => user.votes, {
		onDelete: 'CASCADE', // delete vote when user is deleted
		eager: false,
	})
	user: number;

	@PrimaryColumn()
	@ManyToOne(() => Poll, (poll: Poll) => poll.votes, {
		onDelete: 'CASCADE', // delete vote when poll is deleted
		eager: false,
	})
	poll: number;

	@Column("smallint", { array: true })
	scores: number[];
}
