import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from '../schema/track.schema';
import { CreateTrackDto } from './create-track-dto';

@Controller('tracks')
export class TracksController {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
  ) {}
  @Get()
  getAllTracks(@Query('album') album: string) {
    if (album) {
      return this.trackModel.find({ album });
    }
    return this.trackModel.find();
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.trackModel.findById(id);
  }
  @Post()
  async create(@Body() trackDto: CreateTrackDto) {
    return await this.trackModel.create({
      album: trackDto.album,
      title: trackDto.title,
      duration: trackDto.duration,
      num: trackDto.number,
    });
  }
  @Delete(':id')
  deleteTrack(@Param('id') id: string) {
    return this.trackModel.deleteOne({ _id: id });
  }
}
