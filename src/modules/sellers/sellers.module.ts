import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  catalogSchema,
  CatalogSchema,
  OrderSchema,
  orderSchema,
} from 'src/models';
import { SellersController } from './sellers.controller';
import { SellersService } from './sellers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CatalogSchema.name, schema: catalogSchema },
      { name: OrderSchema.name, schema: orderSchema },
    ]),
  ],
  controllers: [SellersController],
  providers: [SellersService],
})
export class SellersModule {}
