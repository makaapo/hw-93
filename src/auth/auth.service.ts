import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return null;
    }

    const isPasswordCorrect = await user.checkPassword(password);

    if (!isPasswordCorrect) {
      return null;
    }
    return user;
  }
}
