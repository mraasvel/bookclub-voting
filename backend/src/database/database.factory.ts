import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Form } from "src/form/form.entity";
import { FormAnswer } from "src/form/form_answer.entity";
import { FormQuestion } from "src/form/form_question.entity";
import { LinearScale } from "src/form/linear_scale/linear_scale.entity";
import { LinearScaleSubmission } from "src/form/linear_scale/linear_scale_submission.entity";
import { Poll } from "src/poll/poll.entity";
import { Vote } from "src/poll/vote.entity";
import { User } from "src/user/user.entity";
import { TypeORMSession } from "./session.entity";

export default (configService: ConfigService): TypeOrmModuleOptions => ({
	type: 'postgres',
	host: 'postgres',
	port: 5432,
	username: configService.get('POSTGRES_USER'),
	password: configService.get('POSTGRES_PASSWORD'),
	database: configService.get('POSTGRES_DB'),
	entities: [User, TypeORMSession, Poll, Vote, Form, FormQuestion, FormAnswer, LinearScale, LinearScaleSubmission],	
});
