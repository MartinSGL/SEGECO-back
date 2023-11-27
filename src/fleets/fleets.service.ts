import { Injectable } from '@nestjs/common';
import { CreateFleetDto } from './dto/create-fleet.dto';
import { UpdateFleetDto } from './dto/update-fleet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Fleet } from './entities/fleet.entity';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class FleetsService {
  constructor(
    @InjectModel(Fleet.name)
    private readonly fleetService: Model<Fleet>,
    private readonly commonService: CommonService,
  ) {}

  async create(createFleetDto: CreateFleetDto) {
    try {
      createFleetDto.name = createFleetDto.name.toLowerCase();
      createFleetDto.area = createFleetDto.area.toLowerCase();
      createFleetDto.company = createFleetDto.company.toLowerCase();
      const fleet = await this.fleetService.create<Fleet>(createFleetDto);
      return fleet;
    } catch (error) {
      return this.commonService.handleError(error);
    }
  }

  findAll() {
    return this.fleetService.find();
  }

  findAllCompany(company: string, area: string) {
    return this.fleetService.find({ company, area });
  }

  findOne(id: string) {
    return this.fleetService.find({ _id: id });
  }

  update(id: number, updateFleetDto: UpdateFleetDto) {
    return `This action updates a #${id} fleet ${updateFleetDto}`;
  }

  async remove(id: string) {
    try {
      const fleet = await this.fleetService.findOne({ _id: id });
      fleet.isActive = !fleet.isActive;
      fleet.save();
      return fleet;
    } catch (error) {
      return this.commonService.handleError(error);
    }
  }
}
