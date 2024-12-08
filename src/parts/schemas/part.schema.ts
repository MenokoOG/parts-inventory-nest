import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Subcategory } from './subcategory.schema';

@Schema({ timestamps: true })
export class Part extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 0 })
  quantity: number;

  @Prop({ type: Types.ObjectId, ref: 'Subcategory', required: true })
  subcategory: Subcategory;

  // Virtual Field: totalValue = price * quantity
  get totalValue() {
    return this.price * this.quantity;
  }
}

export const PartSchema = SchemaFactory.createForClass(Part);

// Enable virtuals for JSON output
PartSchema.set('toJSON', { virtuals: true });
PartSchema.set('toObject', { virtuals: true });

// Middleware Hook: Log before saving
PartSchema.pre('save', function (next) {
  console.log(`Saving part: ${this.name}`);
  next();
});
