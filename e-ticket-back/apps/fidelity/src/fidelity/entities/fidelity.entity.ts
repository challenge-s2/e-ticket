import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class FidelityDocument extends AbstractDocument {
  @Prop()
  companyId: string;

  @Prop()
  userId: string;

  @Prop()
  userMail: string;

  @Prop()
  points: number;

  @Prop()
  companyInformations: string;
}

export const FidelitySchema = SchemaFactory.createForClass(FidelityDocument);
