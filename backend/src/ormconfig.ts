import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { TypeORMSession } from './session.entity';
import { User } from './user/user.entity';

// TODO: make username/password/name environment variables
export const config: PostgresConnectionOptions = {
	type: 'postgres',
	database: 'pong_db',
	host: 'postgres',
	port: 5432,
	username: 'root',
	password: 'root',
	entities: [User, TypeORMSession],
	synchronize: true,
};
