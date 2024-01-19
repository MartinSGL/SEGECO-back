import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  Delete,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const image = await this.filesService.findOne(id);
      res.setHeader('Content-Type', 'image/png');
      res.send(image);
    } catch (error) {
      return {
        error: true,
        message: error.response.data.message,
      };
    }
  }

  @Delete(':id')
  async removeOne(@Param('id') id: string) {
    return this.filesService.removeOne(id);
  }
}
