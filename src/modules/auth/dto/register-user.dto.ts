import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { UserTypes } from 'src/common/enums';

export class RegisterUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  userName: string;

  @ApiProperty()
  @Matches(/^[ A-Za-z0-9_@./#&+-]*$/)
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(UserTypes)
  userType: string;
}
