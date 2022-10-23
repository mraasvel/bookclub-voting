import { Exclude } from 'class-transformer';
import { IsInt } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { FormAnswer } from '../form_answer.entity';

@Entity()
export class LinearScaleAnswer {
	@PrimaryColumn()
	@Exclude()
	formAnswerFormQuestionId: number;

	@PrimaryColumn()
	@Exclude()
	formAnswerUserId: number;

	@OneToOne(() => FormAnswer, (formAnswer: FormAnswer) => formAnswer.linearScaleAnswer, {
		onDelete: "CASCADE"
	})
	@JoinColumn()
	formAnswer: FormAnswer;

	// Note: backend has to validate this score being in the allowed range.
	@Column()
	score: number;
}

export class LinearScaleAnswerDTO {
	@IsInt()
	score: number;
}
