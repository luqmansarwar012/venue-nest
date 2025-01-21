import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserSignupResponseDto } from './dto/userResponse.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserSignupResponseDto> {
    return await this.userService.create(createUserDto);
  }
}
