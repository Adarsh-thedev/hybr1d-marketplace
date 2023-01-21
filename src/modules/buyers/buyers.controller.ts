import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/common/decorator';
import { BuyerGuard } from 'src/common/guards';
import { JwtGuard } from '../auth/guard';
import { BuyersService } from './buyers.service';
import { CreateOrderDto } from './dto';

@Controller('buyer')
@UseGuards(JwtGuard, BuyerGuard)
export class BuyersController {
  constructor(private readonly buyersService: BuyersService) {}

  @Get('list-of-sellers')
  getAllSellers() {
    return this.buyersService.getAllSellers();
  }

  @Get('seller-catalog/:seller_id')
  getSellerCatalog(@Param('seller_id') seller_id: string) {
    return this.buyersService.getSellerCatalog(seller_id);
  }

  @Post('create-order/:seller_id')
  createOrder(
    @Param('seller_id') seller_id: string,
    @Body() dto: CreateOrderDto,
    @GetUser() buyerId: string,
  ) {
    return this.buyersService.createOrder(seller_id, dto, buyerId);
  }
}
