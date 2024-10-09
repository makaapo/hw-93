import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop({ ref: 'Album', required: true })
  album: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  duration: string;
  @Prop()
  number: number;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
