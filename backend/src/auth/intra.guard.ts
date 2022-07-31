import { Injectable, ExecutionContext, Logger } from '@nestjs/common';
import { Strategy } from 'passport-42';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SessionUser } from './auth.types';
import { ConfigService } from '@nestjs/config';
import { IntraUser } from 'src/user/user.types';

@Injectable()
export class IntraStrategy extends PassportStrategy(Strategy) {
	private readonly logger = new Logger(IntraStrategy.name);
	constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService,
	) {
		super({
			clientID: configService.get('oauth.intra.CLIENT_ID'),
			clientSecret: configService.get('oauth.intra.CLIENT_SECRET'),
			callbackURL: configService.get('oauth.intra.CALLBACK_URL'),
			profileFields: {
				id: function (obj) {
					return String(obj.id);
				},
				username: 'login',
			},
		});
	}

	/*
	Store user in DB if not existant, save refreshToken for later usage
	Return the user object or call a callback function (which would be the fourth argument)
	*/
	async validate(
		access_token: string, // can be used to access API
		refreshToken: string, // can be stored for refreshing access token
		profile: any,
		callback: (error: any, user: SessionUser) => void,
	) {
		const { id: intraId, username } = profile;
		const details: IntraUser = { username, intraId };
		this.logger.debug(`intra user validation: ${JSON.stringify(details)}`);
		const user = await this.authService.validateUser(details);
		callback(null, { id: user.id });
	}
}

@Injectable()
export class IntraGuard extends AuthGuard('42') {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const activate = (await super.canActivate(context)) as boolean;
		const request = context.switchToHttp().getRequest();
		await super.logIn(request);
		return activate;
	}
}
