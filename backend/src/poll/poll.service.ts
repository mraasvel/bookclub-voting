import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Poll } from './poll.entity';
import { PollDTO } from './poll.types';

@Injectable()
export class PollService {
	private readonly logger = new Logger(PollService.name);

	constructor(@InjectRepository(Poll) private pollRepository: Repository<Poll>) {}

	async find() {
		return this.pollRepository.find();
	}

	async findById(id: number) {
		return this.pollRepository.findOneBy({ id });
	}

	async create(pollData: PollDTO) {
		const entity = this.pollRepository.create(pollData);
		this.logger.debug(`make poll: ${JSON.stringify(entity)}`);
		return this.pollRepository.save(entity);
	}

	async delete(id: number) {
		this.pollRepository.delete(id);
	}
}
