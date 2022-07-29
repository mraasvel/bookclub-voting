import {
	ClassSerializerInterceptor,
	INestApplication,
	ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';
import { TypeORMSession } from './session.entity';
import { TypeormStore } from 'connect-typeorm';
import { getRepository } from 'typeorm';
import { BookService } from './books/book.service';

// Session for authorization, staying logged in
async function setupSession(app: INestApplication) {
	const sessionRepository = getRepository(TypeORMSession);
	const configService = app.get(ConfigService);
	app.use(
		session({
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 7,
				sameSite: 'strict',
			},
			name: configService.get('cookie.NAME'),
			secret: configService.get('cookie.SECRET'),
			resave: false,
			rolling: true,
			saveUninitialized: false, // Only save the session if the user is logged in
			store: new TypeormStore().connect(sessionRepository), // session store
		}),
	);
	app.use(passport.initialize());
	app.use(passport.session());
}

async function seed(app: INestApplication) {
	const bookService = app.get(BookService);
	await bookService.seedDatabase();
}

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await setupSession(app);
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalInterceptors(
		new ClassSerializerInterceptor(app.get(Reflector)),
	);
	await seed(app);
	await app.listen(3000);
}
bootstrap();
