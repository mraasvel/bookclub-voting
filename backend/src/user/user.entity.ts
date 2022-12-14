import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Role from './role.enum';
import { Vote } from 'src/poll/vote.entity';
import { FormAnswer } from 'src/form/form_answer.entity';
import { Form } from 'src/form/form.entity';

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

	@OneToMany(() => Form, (form: Form) => form.owner, {
		nullable: true,
	})
	ownedForms: Form[];

	@OneToMany(() => Vote, (vote: Vote) => vote.user)
	votes: Vote[];

	@OneToMany(() => FormAnswer, (formAnswer: FormAnswer) => formAnswer.user, {
		nullable: true,
	})
	formAnswers: FormAnswer[];

	@ManyToMany(() => Form, (form: Form) => form.participants, {
		onDelete: 'CASCADE',
		nullable: true,
	})
	@JoinTable({
		name: 'user_form_submissions',
		joinColumn: { name: 'userId' },
		inverseJoinColumn: { name: 'formId' },
	})
	submittedForms: Form[];
}
