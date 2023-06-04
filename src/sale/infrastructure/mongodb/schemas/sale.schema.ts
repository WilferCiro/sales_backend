import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

class ProductSchema extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  unit_price: number;

  @Prop({ required: false })
  discount_percent: number;
}

class ShopSchema extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  name: string;
}

class HeadquarterSchema extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  shop: ShopSchema;
}

class UserSchema extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  document: string;

  @Prop({ required: true })
  email: string;
}

@Schema({ timestamps: true })
export class SaleDocument extends Document {
  @Prop({ required: true })
  total: number;

  @Prop({ required: true })
  products: ProductSchema[];

  @Prop({ required: true })
  headquarter: HeadquarterSchema;

  @Prop({ required: true })
  user: UserSchema;

  @Prop({ required: true })
  client: UserSchema;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const SaleSchema = SchemaFactory.createForClass(SaleDocument);
