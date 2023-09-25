import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { roles } from 'src/users/interfaces/rolesInterface';
import { User } from 'src/users/entities/user.entity';
import { CommonService } from 'src/common/common.service';
import * as bcrypt from 'bcrypt';
import { CompaniesService } from 'src/companies/companies.service';

@Injectable()
export class SeedsService {
  constructor(
    @InjectModel(User.name)
    private readonly userService: Model<User>,
    private readonly configService: ConfigService,
    @InjectConnection()
    private readonly connection: mongoose.Connection,
    private readonly companiesService: CompaniesService,
    private readonly commonService: CommonService,
  ) {}
  async executeSeeders(password: string) {
    //function to be sure that all constraints works before to insert that
    //for instanse: unique fields
    await this.connection.syncIndexes();
    const seed_password = this.configService.get<string>('SEED_PASSWORD');
    if (password !== seed_password) {
      throw new BadRequestException('incorrect password');
    }
    const usersInfo = await this.setUsersInfo();
    const companiesInfo = await this.setCompaniesInfo();

    return {
      usersInfo,
      companiesInfo,
    };
  }

  async setUsersInfo() {
    //get the info from env file
    const super_user = this.configService
      .get<string>('SUPER_USER')
      .toLowerCase();
    const super_password = this.configService.get<string>('SUPER_PASSWORD');
    const super_fullname = this.configService
      .get<string>('SUPER_FULLNAME')
      .toLowerCase();
    const super_role = roles.super;

    const admin_user = this.configService
      .get<string>('ADMIN_USER')
      .toLowerCase();
    const admin_password = this.configService.get<string>('ADMIN_PASSWORD');
    const admin_fullname = this.configService
      .get<string>('ADMIN_FULLNAME')
      .toLowerCase();
    const admin_role = roles.admin;

    // salt
    const salt = this.configService.get<number>('SALT');

    const super_hash_password = await bcrypt.hash(super_password, salt);
    const admin_hash_password = await bcrypt.hash(admin_password, salt);

    //check if that data exists
    if (!super_user || !super_password || !super_fullname) {
      return 'user, email and password must exist';
    }

    //check if that data exists
    if (!admin_user || !admin_password || !admin_fullname) {
      return 'user, email and password must exist';
    }

    // check if data is already in DB
    try {
      const users = await this.userService.find();
      if (users.length > 0) {
        return 'Data already exist, therefore seed can not be executed';
      }
      //insert data if info is not in db
      await this.userService.insertMany<User>([
        {
          user: super_user,
          password: super_hash_password,
          fullname: super_fullname,
          role: super_role,
        },
        {
          user: admin_user,
          password: admin_hash_password,
          fullname: admin_fullname,
          role: admin_role,
        },
      ]);
      // return message en data
      return 'seed executed successfully';
    } catch (error: any) {
      this.commonService.handleError(error);
    }
  }

  async setCompaniesInfo() {
    try {
      const companies = [{ name: 'peña' }];

      const companiesFound = await this.companiesService.findAll();

      if (companiesFound.length > 0)
        return 'Data already exist, therefore seed can not be executed';

      companies.map((company) => {
        this.companiesService.create(company);
      });

      return 'seed executed successfully';
    } catch (error) {
      console.log(error);
      this.commonService.handleError(error);
    }
  }
}
