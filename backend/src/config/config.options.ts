import { type ConfigModuleOptions } from '@nestjs/config';
import configuration from './config.service';

export const configModuleOptions: ConfigModuleOptions = {
	ignoreEnvFile: true,
	load: [configuration],
};
