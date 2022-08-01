import { Controller, Get, UseGuards, Req, Logger } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/guards/auth.guard';
import { RequestWithUser } from 'src/auth/auth.types';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
@UseGuards(AuthenticatedGuard)
export class UserController {
	private readonly logger = new Logger(UserController.name);

	constructor(private readonly userService: UserService) {}

	@Get('me')
	// Returns private user specifically because there is more information
	@UseGuards(AuthenticatedGuard)
	async findUser(@Req() req: RequestWithUser): Promise<User> {
		const user = await this.userService.findById(req.user.id);
		this.logger.debug(`/user/me -- ${user.username}`);
		return user;
	}
}
