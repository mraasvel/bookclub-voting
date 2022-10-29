export enum Role {
	User = 'User',
	SuperUser = 'SuperUser',
}

export interface Vote {
	user: number;
	poll: number;
	scores: number[];
}

export interface Poll {
	id: number;
	name: string;
	options: string[];
	votes: Vote[];
	closed: boolean;
}

export enum FormQuestionType {
	LinearScale = 'LinearScale',
}

export interface LinearScale {
	title: string;
	description?: string;
	rangeStart: number;
	rangeEnd: number;
}

export interface FormQuestion {
	id: number;
	formQuestionType: FormQuestionType;
	linearScale?: LinearScale;
}

export interface Form {
	id: number;
	name: string;
	formQuestions: FormQuestion[];
	closed: boolean;
}

export interface LinearScaleAnswerDTO {
	score: number;
}

export interface FormAnswerDTO {
	questionId: number;	
	type: FormQuestionType;
	linearScaleAnswer?: LinearScaleAnswerDTO;
}

export interface LinearScaleAnswer {
	score: number;
}

export interface FormAnswer {
	formAnswerType: FormQuestionType,
	linearScaleAnswer?: LinearScaleAnswer,
}

export interface FormQuestionWithAnswer extends FormQuestion {
	formAnswers: FormAnswer[];
}

export type FormResult = FormQuestionWithAnswer[];
