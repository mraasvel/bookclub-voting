import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FormQuestion } from './form_question.entity';

@Entity()
export class Form {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@ManyToOne(() => User, (user: User) => user.ownedForms)
	owner: User;

	@OneToMany(() => FormQuestion, (formQuestion: FormQuestion) => formQuestion.form, {
		eager: true,
	})
	formEntries: FormQuestion[];

	@Column('boolean', { default: false })
	closed: boolean;
}
