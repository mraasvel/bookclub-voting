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
import getLogLevels from './util/getLogLevels';
import { TypeormStore } from 'connect-typeorm/out';
import { DatabaseService } from './database/database.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function setupSwagger(app: INestApplication) {
	const configService = app.get(ConfigService);
	const config = new DocumentBuilder()
		.setTitle(configService.get('APP_NAME'))
		.setVersion('0.1')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
}

async function setupSession(app: INestApplication) {
	const configService = app.get(ConfigService);
	const databaseService = app.get(DatabaseService);
	const sessionRepository = databaseService.getRepository();
	app.use(
		session({
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 7,
			},
			secret: configService.get('cookie.SECRET'),
			resave: false,
			saveUninitialized: false,
			store: new TypeormStore({
				cleanupLimit: 2,
			}).connect(sessionRepository),
		}),
	);
	app.use(passport.initialize());
	app.use(passport.session());
}

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: getLogLevels(process.env.NODE_ENV === 'production'),
	});
	if (process.env.NODE_ENV === 'development') {
		await setupSwagger(app);
	}
	await setupSession(app);
	app.enableCors({
		origin: ['http://localhost:8080'],
		credentials: true,
		exposedHeaders: ['set-cookie'],
	});
	app.useGlobalPipes(
		new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
	);
	app.useGlobalInterceptors(
		new ClassSerializerInterceptor(app.get(Reflector)),
	);
	await app.listen(3000);
}
bootstrap();
