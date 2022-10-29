import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Form } from './form.entity';
import FormQuestionType, { FormQuestionTypeString } from './form_question_type.enum';
import { LinearScale, LinearScaleDTO, LinearScalePartialDTO } from './linear_scale/linear_scale.entity';
import { FormAnswer } from './form_answer.entity';
import { IsEnum, IsNotEmpty, IsObject, IsString, ValidateIf, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@Entity()
export class FormQuestion {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Form, (form: Form) => form.formQuestions, {
		onDelete: "CASCADE",
		eager: false,
	})
	form: Form;

	@OneToMany(() => FormAnswer, (formAnswer: FormAnswer) => formAnswer.formQuestion, {
		nullable: true,
	})
	formAnswers: FormAnswer[];

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
		cascade: true,
	})
	linearScale: LinearScale;
}

export class FormQuestionDTO {
	@IsEnum(FormQuestionType, { message: () => `must be one of: ${FormQuestionTypeString()}` })
	type: FormQuestionType;

	@ValidateIf((dto) => dto.type === FormQuestionType.LinearScale)
	@IsObject()
	@ValidateNested()
	@Type(() => LinearScaleDTO)
	linearScale?: LinearScaleDTO;
}

export class FormQuestionPartialDTO {
	@IsEnum(FormQuestionType, { message: () => `must be one of: ${FormQuestionTypeString()}` })
	type: FormQuestionType;

	@ValidateIf((dto) => dto.type === FormQuestionType.LinearScale)
	@IsObject()
	@ValidateNested()
	@Type(() => LinearScalePartialDTO)
	linearScale?: LinearScalePartialDTO;
}
