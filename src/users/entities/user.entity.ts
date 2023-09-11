import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { roles, Roles } from '../interfaces/rolesInterface';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  user: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'operador', enum: roles })
  role?: Roles;

  @Prop({ default: true })
  isActive?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
