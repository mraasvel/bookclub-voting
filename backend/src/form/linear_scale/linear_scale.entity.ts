import {
	IsInt,
	IsNumber,
	IsOptional,
	IsString,
	Max,
	Min,
} from 'class-validator';
import { ValidateWith } from 'src/validator/validate_with';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { FormQuestion } from '../form_question.entity';

@Entity()
export class LinearScale {
	@PrimaryColumn()
	formQuestionId: number;

	@OneToOne(() => FormQuestion, (form: FormQuestion) => form.linearScale, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	formQuestion: FormQuestion;

	@Column({ type: 'text' })
	title: string;

	@Column({ type: 'text', nullable: true })
	description?: string;

	@Column({ type: 'int' })
	rangeStart: number;

	@Column({ type: 'int' })
	rangeEnd: number;

	private doUpdate(key: string, partial: LinearScalePartialDTO) {
		if (partial[key]) {
			this[key] = partial[key];
		}
	}

	updateFromPartial(partial: LinearScalePartialDTO) {
		this.doUpdate('description', partial);
		this.doUpdate('title', partial);
		this.doUpdate('rangeStart', partial);
		this.doUpdate('rangeEnd', partial);
	}
}

export class LinearScaleDTO {
	@IsString()
	title: string;

	@IsString()
	@IsOptional()
	description?: string;

	// [0, 10]

	@IsInt()
	@Min(0)
	@Max(10)
	@ValidateWith((object) => object.rangeStart <= object.rangeEnd, {
		message: 'rangeStart needs to be less than or equal to rangeEnd',
	})
	rangeStart: number;

	@IsNumber()
	@Min(0)
	@Max(10)
	rangeEnd: number;
}

export class LinearScalePartialDTO {
	@IsString()
	@IsOptional()
	title?: string;

	@IsString()
	@IsOptional()
	description?: string;

	// [0, 10]

	@IsInt()
	@Min(0)
	@Max(10)
	@ValidateWith((object) => object.rangeStart <= object.rangeEnd, {
		message: 'rangeStart needs to be less than or equal to rangeEnd',
	})
	@IsOptional()
	rangeStart?: number;

	@IsNumber()
	@Min(0)
	@Max(10)
	@IsOptional()
	rangeEnd?: number;
}
