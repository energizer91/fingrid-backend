import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Feature extends Document {
  @Prop({ required: true })
  id: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 'proposed' })
  status: string;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: 0 })
  priority: number;

  @Prop({ default: 0 })
  dislikes: number;

  @Prop({ type: Types.ObjectId })
  parent: Types.ObjectId;
}

export const FeatureSchema = SchemaFactory.createForClass(Feature);

// Add the `pre('save')` hook to the schema
FeatureSchema.pre<Feature>('save', async function (next) {
  if (!this.name) {
    try {
      // @ts-expect-error it doesn't count documents although it is there
      const count = await this.constructor.countDocuments(); // Get the count of documents
      this.name = `DH-${count + 1}`; // Generate the new name
    } catch (error) {
      return next(error);
    }
  }
  next();
});
