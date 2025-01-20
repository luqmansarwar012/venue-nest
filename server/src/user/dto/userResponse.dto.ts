import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { User } from '../entities/user.entity';

export class UserSignupResponseDto {
  @ApiProperty() @Expose() message: string;
  @ApiProperty({ type: User }) @Type(() => User) @Expose() data: User;
}
