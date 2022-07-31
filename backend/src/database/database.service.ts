import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeORMSession } from './session.entity';

@Injectable()
export class DatabaseService {
	constructor(
		@InjectRepository(TypeORMSession)
		private sessionRepository: Repository<TypeORMSession>,
	) {}

	getRepository(): Repository<TypeORMSession> {
		return this.sessionRepository;
	}
}
