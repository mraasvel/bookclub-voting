import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthenticatedGuard } from "src/guards/auth.guard";
import { FormService } from "./form.service";

@Controller('form')
@ApiTags('Form')
@UseGuards(AuthenticatedGuard)
export class FormController {
	constructor(private readonly formService: FormService) {}
}
