import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyService: Model<Company>,
    private readonly commonService: CommonService,
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    try {
      createCompanyDto.name = createCompanyDto.name.toLowerCase();
      const company =
        await this.companyService.create<Company>(createCompanyDto);
      return company;
    } catch (error) {
      console.log(error);
      return this.commonService.handleError(error);
    }
  }

  findAll() {
    return this.companyService.find();
  }

  findOne(id: string) {
    return this.companyService.findById({ _id: id });
  }

  async changeActiveStatus(id: string) {
    try {
      const company = await this.companyService.findOne({ _id: id });
      company.isActive = !company.isActive;
      company.save();
      return company;
    } catch (error) {
      console.log(error);
      return this.commonService.handleError(error);
    }
  }
}
