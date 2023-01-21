import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { UserSchema } from './user.schema';

@Schema({ _id: false })
class ProductsSchema {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  price: number;
}

@Schema({ collection: 'catalogs', timestamps: true })
export class CatalogSchema {
  // making unique as one seller can have only one catalog
  @Prop({
    type: Types.ObjectId,
    required: true,
    unique: true,
    ref: UserSchema.name,
  })
  sellerId: Types.ObjectId;

  @Prop({ type: Array<ProductsSchema>, required: true })
  products: Array<ProductsSchema>;
}

export const catalogSchema = SchemaFactory.createForClass(CatalogSchema);
