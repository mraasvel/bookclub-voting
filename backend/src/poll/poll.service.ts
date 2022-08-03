import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Poll } from './poll.entity';
import { PollDTO } from './poll.types';
import { Vote } from './vote.entity';

@Injectable()
export class PollService {
	private readonly logger = new Logger(PollService.name);

	constructor(
		@InjectRepository(Poll) private pollRepository: Repository<Poll>,
		@InjectRepository(Vote) private voteRepository: Repository<Vote>
	) {}

	async find() {
		return await this.pollRepository.find();
	}

	async findById(id: number) {
		const poll = await this.pollRepository.findOneBy({ id });
		if (!poll) {
			throw new NotFoundException();
		}
		return poll;
	}

	async create(pollData: PollDTO) {
		const entity = this.pollRepository.create(pollData);
		this.logger.debug(`make poll: ${JSON.stringify(entity)}`);
		return this.pollRepository.save(entity);
	}

	async delete(id: number) {
		const poll = await this.pollRepository.delete(id);
		if (!poll) {
			throw new NotFoundException();
		}
	}

	async vote(pollId: number, user: User, scores: number[]) {
		for (let score of scores) {
			if (score < 1 || score > 5) {
				throw new BadRequestException("invalid score value");
			}
		}
		const poll = await this.findById(pollId);
		this.logger.debug(`Submit Vote: ${JSON.stringify(user)} -- ${JSON.stringify(poll)}`);
		if (poll.options.length !== scores.length) {
			throw new BadRequestException("invalid scores length");
		}
		const vote = this.voteRepository.create({
			user: user.id,
			poll: poll.id,
			scores
		});
		return await this.voteRepository.upsert(vote, {
			conflictPaths: ["user", "poll"],
			skipUpdateIfNoValuesChanged: true,
		});
	}
}
