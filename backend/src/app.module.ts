import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configModuleOptions } from './config/config.options';
import { BookModule } from './books/book.module';
import { User } from './user/user.entity';
import { Book } from './books/book.entity';
import { TypeORMSession } from './database/session.entity';
import { DatabaseModule } from './database/database.module';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: 'postgres',
				port: 5432,
				username: configService.get('POSTGRES_USER'),
				password: configService.get('POSTGRES_PASSWORD'),
				database: configService.get('POSTGRES_DB'),
				entities: [User, Book, TypeORMSession],
				// todo: setup migrations typeorm
				synchronize: true,
			}),
		}),
		UserModule,
		BookModule,
		AuthModule,
		DatabaseModule,
		PassportModule.register({ session: true }),
		ConfigModule.forRoot(configModuleOptions),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
