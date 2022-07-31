import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { TypeORMSession } from './session.entity';

@Module({
	exports: [DatabaseService],
	imports: [TypeOrmModule.forFeature([TypeORMSession])],
	providers: [DatabaseService],
})
export class DatabaseModule {}
