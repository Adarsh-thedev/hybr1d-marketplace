import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserSchema } from 'src/models';
import { ENV_CONSTANTS } from 'src/utils/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    @InjectModel(UserSchema.name) private readonly userModel: Model<UserSchema>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get(ENV_CONSTANTS.JWT_SECRET),
    });
  }

  async validate(payload: { sub: string }) {
    const dbUser = await this.userModel.findById(payload.sub).lean().exec();
    const user = { _id: dbUser._id, userType: dbUser.userType };
    return user;
  }
}
