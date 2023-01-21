import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { CatalogSchema } from './catalog.schema';
import { UserSchema } from './user.schema';

@Schema({ collection: 'orders', timestamps: true })
export class OrderSchema {
  @Prop({ type: Types.ObjectId, required: true, ref: UserSchema.name })
  buyer: Types.ObjectId;

  @Prop({ type: String, required: true })
  sellerId: string;

  @Prop({ type: Types.ObjectId, required: true, ref: CatalogSchema.name })
  catalogId: Types.ObjectId;

  @Prop({ type: Array<string>, required: true })
  productsOrdered: Array<string>;
}

export const orderSchema = SchemaFactory.createForClass(OrderSchema);
