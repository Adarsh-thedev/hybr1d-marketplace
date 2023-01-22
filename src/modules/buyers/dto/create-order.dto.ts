import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  products: Array<string>;
}
