import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { UserTypes } from 'src/common/enums';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  userName: string;

  @Matches(/^[ A-Za-z0-9_@./#&+-]*$/)
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(UserTypes)
  userType: string;
}
