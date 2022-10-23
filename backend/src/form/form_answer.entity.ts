import { User } from 'src/user/user.entity';
import { Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { FormQuestion } from './form_question.entity';
import { LinearScaleAnswer } from './linear_scale/linear_scale_submission.entity';

@Entity()
export class FormAnswer {
	@PrimaryColumn()
	@ManyToOne(() => FormQuestion, (formQuestion: FormQuestion) => formQuestion.formSubmissions, {
		onDelete: "CASCADE"
	})
	formQuestion: number;

	@PrimaryColumn()
	@ManyToOne(() => User, (user: User) => user.formSubmissions)
	user: number;

	@OneToOne(() => LinearScaleAnswer, (linearScaleAnswer: LinearScaleAnswer) => linearScaleAnswer.formAnswer, {
		nullable: true,
	})
	linearScaleAnswer: LinearScaleAnswer;
}
