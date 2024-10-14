import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsController } from './artists/artists.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './schema/artist.schema';
import { AlbumsController } from './albums/albums.controller';
import { Album, AlbumSchema } from './schema/album.schema';
import { TracksController } from './tracks/tracks.controller';
import { Track, TrackSchema } from './schema/track.schema';
import { User, UserSchema } from './schema/user.schema';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/mySpotify'),
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [
    AppController,
    ArtistsController,
    AlbumsController,
    TracksController,
    UsersController,
  ],
  providers: [AppService],
})
export class AppModule {}
