import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  destinataire: User;

  @Prop({ required: true })
  titre: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true, enum: ['INFO', 'SUCCESS', 'WARNING', 'ERROR'] })
  type: string;

  @Prop({ required: true, enum: ['EMAIL', 'SMS', 'PUSH', 'INAPP'] })
  canal: string;

  @Prop({ default: false })
  lu: boolean;

  @Prop({ type: Object })
  metadata: {
    lien?: string;
    imageUrl?: string;
    actionRequise?: boolean;
    donnees?: Record<string, any>;
  };

  @Prop({ type: Date })
  dateExpiration?: Date;

  @Prop({ default: false })
  archive: boolean;

  @Prop({ type: Date })
  dateLecture?: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);