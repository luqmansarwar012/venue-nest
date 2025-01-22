import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';

export type IsUniqueInterface = {
  field: string;
};

export function IsUniqueField(
  options: IsUniqueInterface,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueFieldConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsUniqueFieldConstraint', async: true })
@Injectable()
export class IsUniqueFieldConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    if (!this.userService) {
      throw new HttpException(
        'UserService is not defined in IsUniqueFieldConstraint',
        400,
      );
    }
    const { field }: IsUniqueInterface = args.constraints[0];
    if (field && value && (await this.userService.isFieldTaken(field, value))) {
      return false;
    }
    return true;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const field: string = validationArguments.property;
    return `${field} already in use`;
  }
}
