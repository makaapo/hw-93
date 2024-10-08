import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { Album, AlbumDocument } from '../schema/album.schema';
import { CreateAlbumDto } from './create-album-dto';
import { Track, TrackDocument } from '../schema/track.schema';

@Controller('albums')
export class AlbumsController {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
  ) {}
  @Get()
  getAllAlbums(@Query('artist') artist: string) {
    if (artist) {
      return this.albumModel.find({ artist });
    }
    return this.albumModel.find();
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.albumModel.findById(id);
  }
  @Post()
  @UseInterceptors(FileInterceptor('image', { dest: './public/images' }))
  async create(
    @Body() albumDto: CreateAlbumDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.albumModel.create({
      artist: albumDto.artist,
      title: albumDto.title,
      release: albumDto.release,
      image: file ? './images/' + file.filename : null,
    });
  }
  @Delete(':id')
  async deleteAlbum(@Param('id') id: string) {
    await this.trackModel.deleteMany({ album: id });
    return this.albumModel.deleteOne({ _id: id });
  }
}
