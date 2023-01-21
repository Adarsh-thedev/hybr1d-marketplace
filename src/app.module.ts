import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BuyersModule } from './modules/buyers/buyers.module';
import { SellersModule } from './modules/sellers/sellers.module';
import { CONSTANTS, ENV_CONSTANTS } from './utils/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get<string>(ENV_CONSTANTS.MONGODB_CONNECTION_STRING) ??
          CONSTANTS.MONGODB_LOCAL,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    BuyersModule,
    SellersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
