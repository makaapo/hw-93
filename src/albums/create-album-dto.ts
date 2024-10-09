import { Schema } from 'mongoose';

export class CreateAlbumDto {
  title: string;
  release: string;
  image: string;
  artist: Schema.Types.ObjectId;
}
