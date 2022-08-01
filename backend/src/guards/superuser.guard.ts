import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RequestWithUser } from 'src/auth/auth.types';

@Injectable()
export class SuperuserGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest<RequestWithUser>();
		return req.user?.username === "mraasvel";
	}
}
