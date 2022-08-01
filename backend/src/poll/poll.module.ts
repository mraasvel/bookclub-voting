import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollController } from './poll.controller';
import { Poll } from './poll.entity';
import { PollService } from './poll.service';
import { Vote } from './vote.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Poll, Vote])],
  controllers: [PollController],
  providers: [PollService]
})
export class PollModule {}
