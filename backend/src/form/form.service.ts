import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Form } from "./form.entity";

@Injectable()
export class FormService {
	private readonly logger = new Logger(FormService.name);

	constructor(
		@InjectRepository(Form) private pollRepository: Repository<Form>,
	) {}
}
