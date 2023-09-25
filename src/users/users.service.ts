import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CommonService } from 'src/common/common.service';
import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload, LoginResponse } from './interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userService: Model<User>,
    private readonly commonService: CommonService,
    //this service is provided by the "JwtModule" which has the config of jwt token, check users.module
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<LoginResponse> {
    loginUserDto.user = loginUserDto.user.toLowerCase();
    const user = await this.userService.findOne<User>({
      user: loginUserDto.user,
    });

    // check if user is correct
    if (!user) throw new UnauthorizedException('Invalid credentials');
    // check if password is correct
    const match = await bcrypt.compare(loginUserDto.password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    return {
      token: this.getJwtToken({
        fullname: user.fullname,
        user: user.user,
        role: user.role,
      }),
    };
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.user = createUserDto.user.toLowerCase();
    createUserDto.fullname = createUserDto.fullname.toLowerCase();
    const salt = this.configService.get<number>('SALT');
    const hash_password = await bcrypt.hash(createUserDto.password, salt);
    try {
      const user = await this.userService.create<User>({
        ...createUserDto,
        password: hash_password,
      });
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

  //generate the jwt and add it the payload
  //check jwt config in users.module file
  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
