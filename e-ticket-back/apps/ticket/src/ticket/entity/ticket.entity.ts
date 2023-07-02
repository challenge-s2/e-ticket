import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common/database/abstract.schema';

@Schema({ versionKey: false })
export class TicketDocument extends AbstractDocument {
  @Prop()
  listProducts: [];

  @Prop()
  creationDate: Date;

  @Prop()
  companyId: string;
}

export const TicketSchema = SchemaFactory.createForClass(TicketDocument);
