import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { roles, Roles } from '../interfaces/rolesInterface';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  user: string;

  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'operator', enum: roles })
  role?: Roles;

  @Prop({ default: true })
  isActive?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
