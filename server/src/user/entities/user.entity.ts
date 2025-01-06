import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RoleEnum } from '../../utils/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Expose()
@Schema({ id: true, timestamps: true })
export class User {
  @Expose() @ApiProperty({ type: String }) id?: string;

  @Prop({ type: String, lowercase: true })
  @ApiProperty({ type: String })
  @Expose()
  firstName: string;

  @Prop({ type: String, lowercase: true })
  @ApiProperty({ type: String })
  @Expose()
  lastName: string;

  @Prop({ type: String, unique: true })
  @ApiProperty({ type: String })
  @Expose()
  phone: string;

  @Prop({
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  })
  @ApiProperty({ type: String })
  @Expose()
  email: string;

  @Prop({ type: String, enum: Object.values(RoleEnum) })
  @ApiProperty({ type: String, enum: Object.values(RoleEnum) })
  @Expose()
  role: RoleEnum;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
