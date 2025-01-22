import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../../utils/enums';
import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsEmail,
  IsMobilePhone,
} from 'class-validator';
import { IsUniqueField } from 'src/utility/validators/isUniqueField-decorator';

export class CreateUserDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({ type: String })
  @IsUniqueField({ field: 'email' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Password should not be empty' })
  @IsString({ message: 'Password must be a string' })
  password: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Username should not be empty' })
  @IsString({ message: 'Username must be a string' })
  username: string;

  @ApiProperty({ type: String })
  @IsMobilePhone(
    null,
    { strictMode: true },
    { message: 'Phone number must be valid' },
  )
  @IsNotEmpty({ message: 'Phone should not be empty' })
  @IsString({ message: 'Phone must be a string' })
  phone: string;

  @ApiProperty({ type: String, enum: Object.values(RoleEnum) })
  @IsNotEmpty({ message: 'Role should not be empty' })
  @IsEnum(RoleEnum, { message: 'Role must be a valid enum value' })
  role: RoleEnum;
}
