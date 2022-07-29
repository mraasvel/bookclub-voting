import {
	Controller,
	Delete,
	Get,
	Req,
	Res,
	UseGuards,
	Post,
	UseFilters,
} from '@nestjs/common';
import { Response } from 'express';
import { IntraGuard } from './intra.guard';
import { AuthenticatedState } from './auth.types';
import { AuthenticatedGuard } from './auth.guard';
import { ConfigService } from '@nestjs/config';
import { OAuthExceptionFilter } from './auth.filter';

@Controller('auth')
export class AuthController {
	constructor(private configService: ConfigService) {}

	@Get('login/intra')
	@UseFilters(OAuthExceptionFilter)
	@UseGuards(IntraGuard)
	async loginIntra(@Res() res: Response) {
		res.redirect(this.configService.get('oauth.REDIRECT_URL'));
	}

	@Post('status')
	status(@Req() req: any) {
		let state: AuthenticatedState;
		if (!req.isAuthenticated || !req.isAuthenticated()) {
			state = 'OAUTH';
		} else {
			state = 'AUTHENTICATED';
		}
		return { state };
	}

	@Delete('logout')
	@UseGuards(AuthenticatedGuard)
	async logout(@Req() req: any) {
		if (!req.session || !req.logout) {
			return;
		}
		req.logout();
		req.session.cookie.maxAge = 0;
		await new Promise<void>((resolve, reject) => {
			req.session.destroy((err: any) => {
				if (err) {
					reject(err);
				}
				resolve();
			});
		});
	}
}
