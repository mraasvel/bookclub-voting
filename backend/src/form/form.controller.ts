import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RequestWithUser } from "src/auth/auth.types";
import { AuthenticatedGuard } from "src/guards/auth.guard";
import RoleGuard from "src/guards/role.guard";
import Role from "src/user/role.enum";
import { FormDTO } from "./form.entity";
import { FormService } from "./form.service";
import { FormAnswerDTO, FormSubmitDTO } from "./form_answer.entity";

@Controller('form')
@ApiTags('Form')
@UseGuards(AuthenticatedGuard)
export class FormController {
	constructor(private readonly formService: FormService) {}

	@Get()
	async getForms() {
		return await this.formService.getForms();
	}

	@Post()
	@UseGuards(RoleGuard(Role.SuperUser))
	async createForm(@Req() req: RequestWithUser, @Body() formData: FormDTO) {
		return await this.formService.createForm(req.user, formData);
	}

	@Post('close/:id')
	@UseGuards(RoleGuard(Role.SuperUser))
	async closeForm(@Param('id', ParseIntPipe) id: number) {
		return await this.formService.closeForm(id);
	}

	@Get(':id')
	async getFormById(@Param('id', ParseIntPipe) id: number) {
		return await this.formService.getFormById(id);
	}

	// upsert
	@Post('submit-answer')
	async submitAnswer(@Req() req: RequestWithUser, @Body() formAnswerData: FormAnswerDTO) {
		return await this.formService.submitAnswer(req.user, formAnswerData);
	}

	@Post('submit-form/:formId')
	async submitForm(@Req() req: RequestWithUser, @Param('formId', ParseIntPipe) formId: number, @Body() formSubmitData: FormSubmitDTO) {
		return await this.formService.submitForm(req.user, formId, formSubmitData);
	}

	@Get('answers/:id')
	async getFormAnswers(@Param('id', ParseIntPipe) id: number) {
		return await this.formService.getFormAnswers(id);
	}

	@Get('own-answers/:id')
	async getOwnFormAnswers(@Req() req: RequestWithUser, @Param('id', ParseIntPipe) formId: number) {
		return await this.formService.getFormAnswers(formId, req.user.id);
	}

	@Get('submit-status/:formId')
	async getSubmitStatus(@Req() req: RequestWithUser, @Param('formId', ParseIntPipe) formId: number) {
		return await this.formService.getSubmitStatus(req.user, formId);
	}
}
