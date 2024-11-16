import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
