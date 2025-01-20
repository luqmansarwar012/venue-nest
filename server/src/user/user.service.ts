import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  private logger: Logger = new Logger(UserService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) {
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

    this.logger.log('User created successfully');
    return {
      message: 'User created successfully',
      data: userCreated,
    };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
