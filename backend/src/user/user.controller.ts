import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/auth.guard';
import { RequestWithUser } from 'src/auth/auth.types';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthenticatedGuard)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('me')
	// Returns private user specifically because there is more information
	@UseGuards(AuthenticatedGuard)
	async findUser(@Req() req: RequestWithUser): Promise<User> {
		const user = await this.userService.findById(req.user.id);
		return user;
	}
}
