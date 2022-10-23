import { Type } from 'class-transformer';
import { IsObject, IsOptional, ValidateNested } from 'class-validator';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { FormQuestion } from './form_question.entity';
import FormQuestionType from './form_question_type.enum';
import { LinearScaleAnswer, LinearScaleAnswerDTO } from './linear_scale/linear_scale_answer.entity';

@Entity()
export class FormAnswer {
	@PrimaryColumn()
	formQuestionId: number;

	@ManyToOne(() => FormQuestion, (formQuestion: FormQuestion) => formQuestion.formAnswers, {
		onDelete: "CASCADE"
	})
	formQuestion: FormQuestion;

	@PrimaryColumn()
	userId: number;

	@ManyToOne(() => User, (user: User) => user.formAnswers)
	user: User;

	// enum represents which variant this entry is.
	@Column({
		type: 'enum',
		enum: FormQuestionType,
	})
	formAnswerType: FormQuestionType;	

	@OneToOne(() => LinearScaleAnswer, (linearScaleAnswer: LinearScaleAnswer) => linearScaleAnswer.formAnswer, {
		eager: true,
		nullable: true,
		cascade: true,
	})
	linearScaleAnswer: LinearScaleAnswer;
}

export class FormAnswerDTO {
	// Note: backend has to validate that the given type is correct for the form question's type
	@IsObject()
	@IsOptional()
	@ValidateNested()
	@Type(() => LinearScaleAnswerDTO)
	linearScaleAnswer?: LinearScaleAnswerDTO;
}
