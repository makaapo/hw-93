import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Artist, ArtistDocument } from '../schema/artist.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateArtistDto } from './create-artist-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Track, TrackDocument } from '../schema/track.schema';
import { Album, AlbumDocument } from '../schema/album.schema';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { AdminGuard } from '../auth/admin-guard';

@Controller('artists')
export class ArtistsController {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
  ) {}
  @Get()
  async getAll() {
    return this.artistModel.find();
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.artistModel.findById(id);
  }
  @UseGuards(TokenAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', { dest: './public/images' }))
  async create(
    @Body() artistDto: CreateArtistDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.artistModel.create({
      title: artistDto.title,
      description: artistDto.description,
      image: file ? './images/' + file.filename : null,
    });
  }

  @UseGuards(TokenAuthGuard, AdminGuard)
  @Delete(':id')
  async deleteArtist(@Param('id') id: string) {
    const albums = await this.albumModel.find({ artist: id });
    albums.map(
      async (el) => await this.trackModel.deleteMany({ album: el._id }),
    );
    await this.albumModel.deleteMany({ artist: id });
    return this.artistModel.deleteOne({ _id: id });
  }
}
