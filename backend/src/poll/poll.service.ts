import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
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
		@InjectRepository(Vote) private voteRepository: Repository<Vote>,
	) {}

	async find() {
		return await this.pollRepository.find();
	}

	async findById(id: number) {
		return await this.findOneOrNotFound(id);
	}

	async findByIdWithUsers(id: number) {
		const poll = await this.pollRepository
			.createQueryBuilder('poll')
			.innerJoinAndSelect('poll.votes', 'votes')
			.innerJoinAndSelect('votes.user', 'user')
			.andWhere('poll.id = :id', { id })
			.getOneOrFail();
		return poll;
	}

	async create(pollData: PollDTO) {
		const entity = this.pollRepository.create(pollData);
		this.logger.debug(`make poll: ${JSON.stringify(entity)}`);
		return this.pollRepository.save(entity);
	}

	async close(id: number) {
		this.logger.debug(`close poll: ${id}`);
		const response = await this.pollRepository
			.createQueryBuilder()
			.update(Poll)
			.set({ closed: true })
			.where('id = :id', { id })
			.execute();
		if (!response.affected) {
			throw new NotFoundException();
		}
	}

	async delete(id: number) {
		const poll = await this.pollRepository.delete(id);
		if (!poll) {
			throw new NotFoundException();
		}
		return poll;
	}

	async vote(pollId: number, user: User, scores: number[]) {
		for (const score of scores) {
			if (score < 1 || score > 5) {
				throw new BadRequestException('invalid score value');
			}
		}
		const poll = await this.findById(pollId);
		this.logger.debug(
			`Submit Vote: ${JSON.stringify(user)} -- ${JSON.stringify(poll)}`,
		);
		if (poll.closed) {
			throw new ForbiddenException('voting is closed');
		}
		if (poll.options.length !== scores.length) {
			throw new BadRequestException('invalid scores length');
		}
		const vote = this.voteRepository.create({
			user: user.id,
			poll: poll.id,
			scores,
		});
		return await this.voteRepository.upsert(vote, {
			conflictPaths: ['user', 'poll'],
			skipUpdateIfNoValuesChanged: true,
		});
	}

	private async findOneOrNotFound(id: number) {
		const poll = await this.pollRepository.findOneBy({ id });
		if (!poll) {
			throw new NotFoundException(`poll with ${id} not found`);
		}
		return poll;
	}
}
