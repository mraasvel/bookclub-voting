import {
	Controller,
	Delete,
	Get,
	Req,
	Res,
	UseGuards,
	Post,
	UseFilters,
	Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { IntraGuard } from './intra.guard';
import { AuthenticatedState } from './auth.types';
import { AuthenticatedGuard } from './auth.guard';
import { ConfigService } from '@nestjs/config';
import { OAuthExceptionFilter } from './auth.filter';

@Controller('auth')
export class AuthController {
	private readonly logger = new Logger(AuthController.name);

	constructor(private configService: ConfigService) {}

	@Get('login')
	@UseFilters(OAuthExceptionFilter)
	@UseGuards(IntraGuard)
	async loginIntra(@Res() res: Response) {
		res.redirect(this.configService.get('oauth.REDIRECT_URL'));
	}

	@Post('status')
	status(@Req() req: any) {
		let state: AuthenticatedState;
		if (!req.isAuthenticated()) {
			state = 'OAUTH';
		} else {
			state = 'AUTHENTICATED';
		}
		return { state };
	}

	@Get('status')
	getStatus(@Req() req: any) {
		let state: AuthenticatedState;
		if (!req.isAuthenticated()) {
			state = 'OAUTH';
		} else {
			state = 'AUTHENTICATED';
		}
		return { state };
	}

	@Delete('logout')
	@UseGuards(AuthenticatedGuard)
	async logout(@Req() req: any) {
		if (!req.session) {
			return;
		}
		req.logout((err: any) => {
			if (err) {
				this.logger.error(err);
			}
		});
		req.session.cookie.maxAge = 0;
	}
}
