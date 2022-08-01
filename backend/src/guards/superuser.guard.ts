import { CanActivate, ExecutionContext, mixin, Type } from "@nestjs/common";
import { Observable } from "rxjs";
import { RequestWithUser } from "src/auth/auth.types";

// https://wanago.io/2021/11/15/api-nestjs-authorization-roles-claims/

const superuserGuard = (): Type<CanActivate> => {
	class RoleGuardMixin implements CanActivate {
		canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
			const request = context.switchToHttp().getRequest<RequestWithUser>();
			const user = request.user;
			return user?.username === "mraasvel";
		}
	}

	return mixin(RoleGuardMixin);
}

export default superuserGuard;
