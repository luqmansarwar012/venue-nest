import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { UserSignupResponseDto } from './dto/userResponse.dto';

@Injectable()
export class UserService {
  private logger: Logger = new Logger(UserService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto): Promise<UserSignupResponseDto> {
    const model = new this.userModel({
      ...createUserDto,
      disabled: false,
      deactivated: false,
      deleted: false,
    });
    const userCreated: User = await model.save();
    if (!userCreated) {
      throw new HttpException('Unable to register user', 422);
    }

    this.logger.log('User registered successfully.');
    const userSignupResponse: UserSignupResponseDto = {
      statusCode: 201,
      message: 'User registered successfully.',
      data: userCreated,
    };

    return userSignupResponse;
  }

  async isFieldTaken(field: string, value: string | number): Promise<boolean> {
    const user: User = await this.userModel.findOne({ [field]: value });
    if (user) {
      return true;
    }
    return false;
  }
}
