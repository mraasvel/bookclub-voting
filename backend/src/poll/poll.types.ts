import {
	ArrayNotEmpty,
	IsArray,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsString,
} from 'class-validator';

export class PollDTO {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsArray()
	@ArrayNotEmpty()
	@IsString({ each: true })
	options: string[];
}

export class VoteDTO {
	@IsNumber()
	@IsNotEmpty()
	pollId: number;

	@IsArray()
	@ArrayNotEmpty()
	@IsInt({ each: true })
	scores: number[];
}
