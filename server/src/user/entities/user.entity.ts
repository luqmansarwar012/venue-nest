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
  name: string;

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

  @Prop({ type: String })
  @ApiProperty({ type: String })
  password: string;

  @Prop({
    type: String,
    unique: true,
    index: true,
    lowercase: true,
    trim: true,
  })
  @ApiProperty({ type: String })
  @Expose()
  username: string;

  @Prop({ type: String, unique: true })
  @ApiProperty({ type: String })
  @Expose()
  phone: string;

  @Prop({ type: String, enum: Object.values(RoleEnum) })
  @ApiProperty({ type: String, enum: Object.values(RoleEnum) })
  @Expose()
  role: RoleEnum;

  @Prop({ type: Boolean })
  @ApiProperty({ type: Boolean })
  @Expose()
  disabled: boolean;

  @Prop({ type: Boolean })
  @ApiProperty({ type: Boolean })
  @Expose()
  deactivated: boolean;

  @Prop({ type: Boolean })
  @ApiProperty({ type: Boolean })
  @Expose()
  deleted: boolean;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
