import { Schema } from 'mongoose';

export class CreateTrackDto {
  album: Schema.Types.ObjectId;
  title: string;
  duration: string;
  number: number;
}
