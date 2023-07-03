import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common/database/abstract.schema';

@Schema({ versionKey: false })
export class CompanyDocument extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  type: string;

  @Prop()
  address: string;

  @Prop()
  registerDate: Date;

  @Prop()
  userId: string;

  @Prop()
  qrCode: string;
}

export const CompanySchema = SchemaFactory.createForClass(CompanyDocument);
