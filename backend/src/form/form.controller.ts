import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RequestWithUser } from "src/auth/auth.types";
import { AuthenticatedGuard } from "src/guards/auth.guard";
import RoleGuard from "src/guards/role.guard";
import Role from "src/user/role.enum";
import { FormDTO } from "./form.entity";
import { FormService } from "./form.service";

@Controller('form')
@ApiTags('Form')
@UseGuards(AuthenticatedGuard)
export class FormController {
	constructor(private readonly formService: FormService) {}

	@Post()
	@UseGuards(RoleGuard(Role.SuperUser))
	async createForm(@Req() req: RequestWithUser, @Body() formData: FormDTO) {
	}
}
