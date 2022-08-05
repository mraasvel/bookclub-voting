import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'src/auth/auth.types';
import { AuthenticatedGuard } from 'src/guards/auth.guard';
import RoleGuard from 'src/guards/role.guard';
import Role from 'src/user/role.enum';
import { PollService } from './poll.service';
import { PollDTO, VoteDTO } from './poll.types';

@Controller('poll')
@ApiTags('Poll')
@UseGuards(AuthenticatedGuard)
export class PollController {
	constructor(private readonly pollService: PollService) {}

	@Get()
	async getPoll() {
		return await this.pollService.find();
	}

	@Get(':id')
	async getPollById(@Param('id', ParseIntPipe) id: number) {
		return await this.pollService.findById(id);
	}

	@Get('complete/:id')
	@UseGuards(RoleGuard(Role.SuperUser))
	async getPollByIdWithVotes(@Param('id', ParseIntPipe) id: number) {
		return await this.pollService.findByIdWithUsers(id);
	}

	@Post('vote')
	async vote(@Req() req: RequestWithUser, @Body() voteData: VoteDTO) {
		return await this.pollService.vote(
			voteData.pollId,
			req.user,
			voteData.scores,
		);
	}

	@Post()
	@UseGuards(RoleGuard(Role.SuperUser))
	async createPoll(@Body() pollData: PollDTO) {
		return await this.pollService.create(pollData);
	}

	@Delete(':id')
	@UseGuards(RoleGuard(Role.SuperUser))
	async deletePoll(@Param('id', ParseIntPipe) id: number) {
		return await this.pollService.delete(id);
	}
}
