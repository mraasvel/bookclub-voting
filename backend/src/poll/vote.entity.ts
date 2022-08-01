import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Vote will be rated 1-5
// It has a relation to the user who made it (many votes to one user)
// and a many to one relation with the poll it belongs to

@Entity()
export class Vote {
	@PrimaryGeneratedColumn()
	id: number;
}
