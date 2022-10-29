import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
} from 'class-validator';

export function ValidateWith(
	condition: (object: any, value: any) => boolean,
	validationOptions?: ValidationOptions,
) {
	return function (object: any, propertyName: string) {
		registerDecorator({
			name: 'ValidateWith',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					return condition(args.object, value);
				},
			},
		});
	};
}
