import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class ContactDocument extends AbstractDocument {
  @Prop()
  email: string;

  @Prop()
  lastname: string;

  @Prop()
  firstname: string;

  @Prop()
  companyName: string;

  @Prop()
  type: string;

  @Prop()
  phone: string;

  @Prop()
  position: string;

  @Prop()
  status: string;
}

export const ContactSchema = SchemaFactory.createForClass(ContactDocument);
