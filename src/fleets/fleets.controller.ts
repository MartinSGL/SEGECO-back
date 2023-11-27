import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FleetsService } from './fleets.service';
import { CreateFleetDto } from './dto/create-fleet.dto';
import { UpdateFleetDto } from './dto/update-fleet.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('fleets')
export class FleetsController {
  constructor(private readonly fleetsService: FleetsService) {}

  @Post()
  create(@Body() createFleetDto: CreateFleetDto) {
    return this.fleetsService.create(createFleetDto);
  }

  @Get()
  findAll() {
    return this.fleetsService.findAll();
  }

  @Get('/:company/:area')
  findAllCompany(
    @Param('company') company: string,
    @Param('area') area: string,
  ) {
    return this.fleetsService.findAllCompany(company, area);
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.fleetsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateFleetDto: UpdateFleetDto,
  ) {
    return this.fleetsService.update(+id, updateFleetDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.fleetsService.remove(id);
  }
}
