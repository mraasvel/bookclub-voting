import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { config } from './ormconfig';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from './config/config.options';
import { BookModule } from './books/book.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(config),
		UserModule,
		BookModule,
		AuthModule,
		PassportModule.register({ session: true }),
		ConfigModule.forRoot(configModuleOptions),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
