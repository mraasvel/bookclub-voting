import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { RequestWithUser } from 'src/auth/auth.types';
import Role from 'src/user/role.enum';

function hasRolePermissions(role: Role, minimumRequiredRole: Role) {
	switch (role) {
		case Role.User: {
			return role === minimumRequiredRole;
		}
		case Role.SuperUser: {
			return true;
		}
	}
}

const RoleGuard = (role: Role): Type<CanActivate> => {
	class RoleGuardMixin implements CanActivate {
		canActivate(context: ExecutionContext) {
			const request = context
				.switchToHttp()
				.getRequest<RequestWithUser>();
			const user = request.user;
			return hasRolePermissions(user?.role, role);
		}
	}
	return mixin(RoleGuardMixin);
};

export default RoleGuard;
