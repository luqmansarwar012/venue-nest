import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { RoleEnum } from '../../utils/enums';

export function IsNotAdminRole(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotAdminRoleConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsNotAdminRoleConstraint', async: true })
@Injectable()
export class IsNotAdminRoleConstraint implements ValidatorConstraintInterface {
  async validate(value: any): Promise<boolean> {
    if (value && value == RoleEnum.ADMIN) {
      return false;
    }
    return true;
  }

  defaultMessage(): string {
    return `Role can only be of type venue owner or customer`;
  }
}
