import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { FormAnswer } from '../form_answer.entity';

@Entity()
export class LinearScaleAnswer {
	@PrimaryColumn()
	@OneToOne(() => FormAnswer, (formAnswer: FormAnswer) => formAnswer.linearScaleAnswer)
	formAnswer: number;

	// Note: backend has to validate this score being in the allowed range.
	@Column()
	score: number;
}
