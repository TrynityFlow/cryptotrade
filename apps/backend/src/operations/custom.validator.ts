import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsRequiredIf(
  property: string,
  value: any,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isRequiredIf',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property, value],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName, relatedValue] = args.constraints as [
            string,
            any,
          ];
          const relatedValueInstance = (args.object as Record<string, any>)[
            relatedPropertyName
          ];
          if (relatedValueInstance === relatedValue) {
            return value !== null && value !== undefined && value !== '';
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName, relatedValue] = args.constraints as [
            string,
            any,
          ];
          return `${args.property} is required when ${relatedPropertyName} is ${relatedValue}`;
        },
      },
    });
  };
}
