import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderSchema } from 'src/models';
import { CatalogSchema } from 'src/models/catalog.schema';
import { CreateCatalogDto } from './dto';

@Injectable()
export class SellersService {
  constructor(
    @InjectModel(CatalogSchema.name) private catalogModel: Model<CatalogSchema>,
    @InjectModel(OrderSchema.name) private orderModel: Model<OrderSchema>,
  ) {}

  async createCatalog(catalogBody: CreateCatalogDto, sellerId: string) {
    const payload = {
      sellerId,
      products: catalogBody.products,
    };

    try {
      const created = await this.catalogModel.create(payload);
      return created;
    } catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException('Seller already have a catalog');
      }

      throw new InternalServerErrorException('Something unexpected happened');
    }
  }

  async getOrders(sellerId: string) {
    const condition = { sellerId };
    const orders = await this.orderModel
      .find(condition)
      .populate('buyer', { userName: 1, _id: 0 })
      .lean()
      .exec();

    if (!orders || !orders.length) {
      return {
        status: HttpStatus.NO_CONTENT,
        message: 'No orders found',
      };
    }

    return orders;
  }
}
