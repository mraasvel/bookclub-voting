import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormController } from './form.controller';
import { Form } from './form.entity';
import { FormService } from './form.service';

@Module({
	imports: [TypeOrmModule.forFeature([Form])],
	controllers: [FormController],
	providers: [FormService],
})
export class FormModule {}
