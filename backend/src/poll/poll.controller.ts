import { Body, Controller, Delete, Get, NotImplementedException, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/guards/auth.guard';
import { SuperuserGuard } from 'src/guards/superuser.guard';
import { PollService } from './poll.service';
import { PollDTO } from './poll.types';

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

	@Post('vote/:id')
	async vote(@Param('id', ParseIntPipe) id: number) {
		throw new NotImplementedException();
	}

	@Post()
	@UseGuards(SuperuserGuard)
	async createPoll(@Body() pollData: PollDTO) {
		return await this.pollService.create(pollData);
	}

	@Delete(':id')
	@UseGuards(SuperuserGuard)
	async deletePoll(@Param('id', ParseIntPipe) id: number) {
		return await this.pollService.delete(id);
	}
}
