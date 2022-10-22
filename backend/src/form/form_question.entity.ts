import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Form } from './form.entity';
import FormQuestionType from './form_question_type.enum';
import { LinearScale } from './linear_scale/linear_scale.entity';
import { FormAnswer } from './form_answer.entity';

@Entity()
export class FormQuestion {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Form, (form: Form) => form.formEntries, {
		onDelete: "CASCADE",
		eager: false,
	})
	form: Form;

	@OneToMany(() => FormAnswer, (formAnswer: FormAnswer) => formAnswer.formQuestion)
	formSubmissions: FormAnswer[];

	// enum represents which variant this entry is.
	@Column({
		type: 'enum',
		enum: FormQuestionType,
	})
	formQuestionType: FormQuestionType;

	// Enum variant tables below.
	// Invariant: the one related to the type is NOT NULL.

	@OneToOne(() => LinearScale, (linearScale: LinearScale) => linearScale.formQuestion, {
		eager: true,
		nullable: true,
	})
	linearScale: LinearScale;
}
