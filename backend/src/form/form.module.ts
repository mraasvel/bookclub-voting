import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormController } from './form.controller';
import { Form } from './form.entity';
import { FormService } from './form.service';
import { FormAnswer } from './form_answer.entity';
import { FormQuestion } from './form_question.entity';
import { LinearScale } from './linear_scale/linear_scale.entity';
import { LinearScaleAnswer } from './linear_scale/linear_scale_answer.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Form, FormQuestion, FormAnswer, LinearScale, LinearScaleAnswer])],
	controllers: [FormController],
	providers: [FormService],
})
export class FormModule {}
