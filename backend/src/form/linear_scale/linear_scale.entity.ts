import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { FormQuestion } from '../form_question.entity';

@Entity()
export class LinearScale {
	@PrimaryColumn()
	@OneToOne(() => FormQuestion, (form: FormQuestion) => form.linearScale)
	formQuestion: number;

	@Column({ type: "text" })
	title: string;

	@Column({ type: "text", nullable: true })
	description: string;

	@Column({ type: "int4range"})
	scoringRange: string;
}
