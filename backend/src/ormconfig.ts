import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Book } from './books/book.entity';
import { TypeORMSession } from './session.entity';
import { User } from './user/user.entity';

// TODO: make username/password/name environment variables
export const config: PostgresConnectionOptions = {
	type: 'postgres',
	database: 'bookclub',
	host: 'postgres',
	port: 5432,
	username: 'root',
	password: 'root',
	entities: [User, TypeORMSession, Book],
	// todo: setup migrations typeorm
	synchronize: true,
};
