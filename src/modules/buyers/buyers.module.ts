import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CatalogSchema,
  catalogSchema,
  OrderSchema,
  orderSchema,
  UserSchema,
  userSchema,
} from 'src/models';
import { BuyersController } from './buyers.controller';
import { BuyersService } from './buyers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchema.name, schema: userSchema },
      { name: CatalogSchema.name, schema: catalogSchema },
      { name: OrderSchema.name, schema: orderSchema },
      ,
    ]),
  ],
  controllers: [BuyersController],
  providers: [BuyersService],
})
export class BuyersModule {}
