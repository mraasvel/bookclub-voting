import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FormQuestion, FormQuestionDTO } from './form_question.entity';

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
		cascade: true,
	})
	formQuestions: FormQuestion[];

	@Column('boolean', { default: false })
	closed: boolean;

	@ManyToMany(() => User, (user) => user.submittedForms)
	participants: User[];
}

// Owner comes from session
export class FormDTO {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsArray()
	@IsObject({ each: true })
	@ValidateNested({ each: true })
	@Type(() => FormQuestionDTO)
	questions: FormQuestionDTO[];
}
