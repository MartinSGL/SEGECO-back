import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../entities/user.entity';
import { UserInformation, JwtPayload } from '../interfaces';

//PassportStrategy: return the token
//Strategy: validate the token
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private readonly userService: Model<User>,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload): Promise<UserInformation> {
    const { _id, user, fullname, role } = await this.userService.findOne({
      user: payload.user,
    })
    if (!user) throw new UnauthorizedException('Token not valid');

    //make a new object without the password
    const infoUser = { id: _id, user, fullname, role };

    // this info goes to req.user and it can be retrieved
    // in this case is retrieved with get-user decorator
    return infoUser;
  }
}
