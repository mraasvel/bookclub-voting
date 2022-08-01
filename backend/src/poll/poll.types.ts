import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator";

export class PollDTO {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsArray()
	@ArrayNotEmpty()
	@IsString({ each: true })
	options: string[];
}
