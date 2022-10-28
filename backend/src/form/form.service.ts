import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { Form, FormDTO } from "./form.entity";
import { FormAnswer, FormAnswerDTO, FormSubmitDTO } from "./form_answer.entity";
import { FormQuestion, FormQuestionDTO } from "./form_question.entity";
import FormQuestionType from "./form_question_type.enum";
import { LinearScale, LinearScaleDTO } from "./linear_scale/linear_scale.entity";
import { LinearScaleAnswer, LinearScaleAnswerDTO } from "./linear_scale/linear_scale_answer.entity";

export type SubmitStatus = "submitted" | "notSubmitted";

@Injectable()
export class FormService {
	private readonly logger = new Logger(FormService.name);

	constructor(
		@InjectRepository(Form) private formRepository: Repository<Form>,
		@InjectRepository(FormQuestion) private formQuestionRepository: Repository<FormQuestion>,
		@InjectRepository(FormAnswer) private formAnswerRepository: Repository<FormAnswer>,
		@InjectRepository(LinearScale) private linearScaleRepository: Repository<LinearScale>,
		@InjectRepository(LinearScaleAnswer) private linearScaleAnswerRepository: Repository<LinearScaleAnswer>,
	) {}

	async createForm(owner: User, formData: FormDTO) {
		let form = this.formFromDTO(owner, formData);
		this.logger.log(`User: [${owner.id}] ${owner.username} creates new form: ${formData.name}`);
		await this.formRepository.save(form);
	}

	async closeForm(formId: number) {
		let form = await this.getFormById(formId);
		this.logger.log(`Form closed: ${form.name} ${form.id}`);
		await this.formRepository.update(formId, { closed: true });
	}

	async getForms() {
		return await this.formRepository.find();
	}

	async getFormById(id: number) {
		let form = await this.formRepository.findOneBy({ id });
		if (!form) {
			throw new NotFoundException();
		}
		return form;
	}

	async submitAnswer(user: User, answerData: FormAnswerDTO, formId?: number) {
		let question = await this.formQuestionRepository.createQueryBuilder('question')
			.where('question.id = :id', { id: answerData.questionId })
			.innerJoinAndSelect('question.form', 'form')
			.innerJoinAndSelect('question.linearScale', 'linearScale')
			.getOneOrFail();
		if (question.form.closed) {
			throw new ForbiddenException("form is closed");
		}
		if (formId && question.form.id !== formId) {
			throw new BadRequestException(`invalid answer for given formId: expected: ${question.form.id}, received: ${formId}`);
		}
		this.assertFormTypeProperty(question.formQuestionType, answerData);
		let answer = this.answerFromDTO(user.id, question, answerData);
		await this.formAnswerRepository.save(answer);
	}

	async getFormAnswers(formId: number, userId?: number) {
		let qb = this.formRepository.createQueryBuilder('form')
			.innerJoinAndSelect('form.formQuestions', 'formQuestions')
			.innerJoinAndSelect('formQuestions.formAnswers', 'formAnswers')
			.innerJoinAndSelect('formAnswers.linearScaleAnswer', 'linearScaleAnswer')
			.where('form.id = :formId', { formId });
		if (userId) {
			qb.andWhere('formAnswers.userId = :userId', { userId });
		}
		let form = await qb.getOneOrFail();
		return form.formQuestions.flatMap((question) => question.formAnswers);
	}

	async submitForm(user: User, formId: number, formSubmitData: FormSubmitDTO) {
		for (let answer of formSubmitData.answers) {
			await this.submitAnswer(user, answer, formId);
		}
		let form = await this.formRepository.findOneOrFail({
			where: { id: formId },
			relations: ['participants']
		});
		if (form.participants.find((x) => x.id === user.id)) {
			return;
		}
		form.participants.push(user);
		await this.formRepository.save(form);
	}

	async getSubmitStatus(user: User, formId: number): Promise<SubmitStatus> {
		let form = await this.formRepository.createQueryBuilder('form')
			.innerJoinAndSelect('form.participants', 'participants')
			.where('form.id = :formId', { formId })
			.andWhere('participants.id = :id', { id: user.id })
			.getOne();
		return !form ? "notSubmitted" : "submitted";
	}

/* Private */

	private formFromDTO(owner: User, formData: FormDTO) {
		return this.formRepository.create({
			name: formData.name,
			owner,
			formQuestions: formData.questions.map((question) => this.questionFromDTO(question)),
		});
	}

	private questionFromDTO(questionData: FormQuestionDTO): FormQuestion {
		return this.formQuestionRepository.create({
			formQuestionType: questionData.type,
			linearScale: this.linearScaleFromDTO(questionData.linearScale),
		});
	}

	private linearScaleFromDTO(linearScale?: LinearScaleDTO) {
		if (!linearScale) {
			return null;
		}
		return this.linearScaleRepository.create({
			title: linearScale.title,
			description: linearScale.description,
			rangeStart: linearScale.rangeStart,
			rangeEnd: linearScale.rangeEnd,
		});
	}

	private answerFromDTO(userId: number, question: FormQuestion, answerData: FormAnswerDTO) {
		return this.formAnswerRepository.create({
			userId,
			formQuestionId: question.id,
			formAnswerType: question.formQuestionType,
			linearScaleAnswer: this.linearScaleAnswerFromDTO(question, answerData.linearScaleAnswer),
		});
	}

	private linearScaleAnswerFromDTO(question: FormQuestion, linearScaleAnswer?: LinearScaleAnswerDTO) {
		if (!linearScaleAnswer) {
			return null;
		} else if (linearScaleAnswer.score < question.linearScale.rangeStart || linearScaleAnswer.score > question.linearScale.rangeEnd) {
			throw new BadRequestException(`invalid score value for linear scale question: ${linearScaleAnswer.score}`);
		}
		return this.linearScaleAnswerRepository.create({
			score: linearScaleAnswer.score
		});
	}

	private assertFormTypeProperty(type: FormQuestionType, object: any) {
		switch (type) {
			case FormQuestionType.LinearScale:
				if (!object?.linearScaleAnswer) {
					throw new BadRequestException("expected linear scale answer");
				}
				break;
		}
	}
}
