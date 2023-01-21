import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';
import { UserSchema } from 'src/models';
import { CONSTANTS, ENV_CONSTANTS } from 'src/utils/constants';
import { LoginUserDto, RegisterUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserSchema.name) private userModel: Model<UserSchema>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async registerUser(userDetails: RegisterUserDto) {
    const { userName, password, userType } = userDetails;
    // hash password
    const passwordHash = await bcrypt.hash(password, CONSTANTS.SALT_ROUNDS);
    const payload = { userName, userType, password: passwordHash };

    try {
      const createdUser = await this.userModel.create(payload);
      // TODO: if userType is seller, create catalog
      return this.signToken(createdUser._id, createdUser.userType);
    } catch (e) {
      if (e.code === 11000) {
        throw new BadGatewayException('Username already taken');
      }
      throw new InternalServerErrorException();
    }
  }

  async login(userDetails: LoginUserDto) {
    const { userName, password } = userDetails;
    const findCondition = { userName };
    const dbUser = await this.userModel.findOne(findCondition).lean().exec();

    if (!dbUser) {
      throw new NotFoundException('User not found');
    }

    // if user found, match password
    const isMatch = bcrypt.compareSync(password, dbUser.password);
    if (!isMatch) {
      throw new BadRequestException('Email and password do not match');
    }

    return this.signToken(dbUser._id, dbUser.userType);
  }

  private async signToken(
    userId: Types.ObjectId,
    userType: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      userType,
    };

    const secret = this.configService.get(ENV_CONSTANTS.JWT_SECRET);

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret,
    });

    return { access_token: `Bearer ${token}` };
  }
}
