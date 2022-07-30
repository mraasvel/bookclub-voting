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
import { BookService } from './books/book.service';

// todo: fix deprecated usage, look at session docs, consider jwt maybe etc
async function setupSession(app: INestApplication) {
	const configService = app.get(ConfigService);
	app.use(
		session({
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 7,
				sameSite: 'strict',
			},
			name: configService.get('cookie.NAME'),
			secret: configService.get('cookie.SECRET'),
			saveUninitialized: false,
			resave: true,
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
	app.enableCors({
		origin: ['http://localhost:8080'],
		credentials: true,
		exposedHeaders: ['set-cookie'],
	});
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalInterceptors(
		new ClassSerializerInterceptor(app.get(Reflector)),
	);
	await seed(app);
	await app.listen(3000);
}
bootstrap();
