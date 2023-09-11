import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userService: Model<User>,
    private readonly commonService: CommonService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.email = createUserDto.email.toLowerCase();
    createUserDto.email = createUserDto.user.toLowerCase();
    try {
      const user = await this.userService.create<User>(createUserDto);
      return user;
    } catch (error: any) {
      this.commonService.handleError(error);
    }
  }

  findAll() {
    return this.userService.find();
  }

  async changeActiveStatus(id: string) {
    try {
      const user = await this.userService.findOne({ _id: id });
      user.isActive = !user.isActive;
      user.save();
      return user;
    } catch (error) {
      this.commonService.handleError(error);
    }
  }
}
