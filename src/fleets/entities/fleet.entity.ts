import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Fleet {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, index: true })
  company: string;

  @Prop({ required: true })
  area: string;

  @Prop({ default: true })
  isActive?: boolean;
}

export const FleetSchema = SchemaFactory.createForClass(Fleet);
