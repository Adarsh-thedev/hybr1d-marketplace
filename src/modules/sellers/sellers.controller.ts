import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SellerGuard } from 'src/common/guards';
import { GetUser } from '../../common/decorator';
import { JwtGuard } from '../auth/guard';
import { CreateCatalogDto } from './dto';
import { SellersService } from './sellers.service';

@Controller('seller')
@UseGuards(JwtGuard, SellerGuard)
export class SellersController {
  constructor(private readonly sellerService: SellersService) {}

  @Post('create-catalog')
  createCatalog(@Body() dto: CreateCatalogDto, @GetUser() sellerId: string) {
    return this.sellerService.createCatalog(dto, sellerId);
  }

  @Get('orders')
  getOrders(@GetUser() sellerId: string) {
    return this.sellerService.getOrders(sellerId);
  }
}
