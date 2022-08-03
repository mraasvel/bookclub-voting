import Role from './role.enum';

export interface IntraUser {
	intraId: string;
	username: string;
	role?: Role;
}
