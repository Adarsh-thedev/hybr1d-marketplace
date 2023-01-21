import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserTypes } from 'src/common/enums';
import { CatalogSchema, OrderSchema, UserSchema } from 'src/models';
import { CreateOrderDto } from './dto';

@Injectable()
export class BuyersService {
  constructor(
    @InjectModel(UserSchema.name) private readonly userModel: Model<UserSchema>,
    @InjectModel(CatalogSchema.name)
    private readonly catalogModel: Model<CatalogSchema>,
    @InjectModel(OrderSchema.name)
    private readonly orderSchema: Model<OrderSchema>,
  ) {}

  async getAllSellers() {
    const condition = { userType: UserTypes.SELLER };
    const projection = { userName: 1, userType: 1 };

    const sellers = await this.userModel
      .find(condition, projection)
      .lean()
      .exec();

    return sellers;
  }

  async getSellerCatalog(sellerId: string) {
    const condition = { sellerId: new Types.ObjectId(sellerId) };
    const projection = { products: 1, _id: 0 };

    // find the catalog of the seller
    const catalog = await this.catalogModel
      .findOne(condition, projection)
      .lean()
      .exec();
    if (!catalog) {
      throw new NotFoundException(
        'This seller does not have any catalog at the moment',
      );
    }

    return catalog;
  }

  async createOrder(
    sellerId: string,
    productsToOrder: CreateOrderDto,
    buyerId: string,
  ) {
    // check if product exists in the seller catalog
    const existsCondition = {
      sellerId: new Types.ObjectId(sellerId),
      'products.name': { $all: productsToOrder.products },
    };
    const productExists = await this.catalogModel
      .findOne(existsCondition)
      .lean()
      .exec();

    if (!productExists) {
      throw new BadRequestException(
        `Some or all of the given products do not exist in seller's catalog`,
      );
    }

    const payload = {
      sellerId,
      buyerId,
      catalogId: productExists._id,
      productsOrdered: productsToOrder.products,
    };
    const created = await this.orderSchema.create(payload);
    return created;
  }
}
