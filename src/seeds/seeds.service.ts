import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { roles } from 'src/users/interfaces/rolesInterface';
import { User } from 'src/users/entities/user.entity';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class SeedsService {
  constructor(
    @InjectModel(User.name)
    private readonly userService: Model<User>,
    private readonly configService: ConfigService,
    @InjectConnection()
    private readonly connection: mongoose.Connection,
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
    const userInfo = await this.setUsersInfo();

    return {
      userInfo,
    };
  }

  async setUsersInfo() {
    //get the info from env file
    const super_user = this.configService.get<string>('SUPER_USER');
    const super_email = this.configService.get<string>('SUPER_EMAIL');
    const super_password = this.configService.get<string>('SUPER_PASSWORD');
    const super_role = roles.super;

    const admin_user = this.configService.get<string>('ADMIN_USER');
    const admin_email = this.configService.get<string>('ADMIN_EMAIL');
    const admin_password = this.configService.get<string>('ADMIN_PASSWORD');
    const admin_role = roles.super;

    //check if that data exists
    if (!super_user || !super_email || !super_password) {
      return 'user, email and password must exist';
    }

    //check if that data exists
    if (!admin_user || !admin_email || !admin_password) {
      return 'user, email and password must exist';
    }

    // check if data is already in DB
    try {
      const users = await this.userService.find();
      if (users.length > 0) {
        return 'Data already exist, therefore seed can not be executed';
      }
      //insert data if info is not in db
      await this.userService.insertMany([
        {
          user: super_user,
          email: super_email,
          password: super_password,
          role: super_role,
        },
        {
          user: admin_user,
          email: admin_email,
          password: admin_password,
          role: admin_role,
        },
      ]);
      // return message en data
      return 'seed executed successfully';
    } catch (error: any) {
      this.commonService.handleError(error);
    }
  }
}
