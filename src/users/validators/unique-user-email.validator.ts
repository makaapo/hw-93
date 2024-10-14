import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidatorOptions,
} from 'class-validator';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schema/user.schema';
import { Model } from 'mongoose';

@ValidatorConstraint({ name: 'uniqueUserEmail', async: true })
@Injectable()
export class UniqueUserEmailConstraint implements ValidatorConstraintInterface {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async validate(email: string) {
    const user = await this.userModel.findOne({ email });
    return !user;
  }

  defaultMessage(): string {
    return 'This email is already registered';
  }
}

export function UniqueUserEmail(validatorOptions?: ValidatorOptions) {
  return function (
    object: { constructor: CallableFunction },
    propertyName: string,
  ) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validatorOptions,
      constraints: [],
      validator: UniqueUserEmailConstraint,
    });
  };
}
