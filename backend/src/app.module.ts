import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configModuleOptions } from './config/config.options';
import { DatabaseModule } from './database/database.module';
import { PollModule } from './poll/poll.module';
import databaseFactory from './database/database.factory';
import { FormModule } from './form/form.module';
import { HealthCheckController } from './health/health.controller';
import { TerminusModule } from '@nestjs/terminus';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: databaseFactory,
		}),
		UserModule,
		AuthModule,
		DatabaseModule,
		PassportModule.register({ session: true }),
		ConfigModule.forRoot(configModuleOptions),
		PollModule,
		FormModule,
		TerminusModule,
	],
	controllers: [HealthCheckController],
	providers: [],
})
export class AppModule {}
