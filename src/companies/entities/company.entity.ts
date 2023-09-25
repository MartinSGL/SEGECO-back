import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ default: true })
  isActive?: boolean;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
