import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { IntraUser } from 'src/user/user.types';

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);

	constructor(private userService: UserService) {}

	async validateUser(user: IntraUser) {
		const user_db = await this.findUser(user);
		if (!user_db) {
			return await this.createUser(user);
		}
		this.logger.debug(`found user: ${JSON.stringify(user_db)}`);
		return user_db;
	}
	
	async createUser(user: IntraUser) {
		this.logger.debug(`creating new user: ${JSON.stringify(user)}`);
		return await this.userService.addUser(user);
	}

	async findUser(user: IntraUser) {
		return this.userService.findByIntraId(user);
	}
}
