import { ArrayNotEmpty, IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @ArrayNotEmpty()
  products: Array<string>;
}
