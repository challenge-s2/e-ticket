import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common/database/abstract.schema';

@Schema({ versionKey: false })
export class ProductsDocument extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  companyId: string;

  @Prop()
  creationDate: Date;
}

export const ProductsSchema = SchemaFactory.createForClass(ProductsDocument);
