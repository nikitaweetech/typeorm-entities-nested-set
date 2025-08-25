import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item/item.entity';
import { Category } from './category/category.entity';
import { CategoryController } from './category/category.controller';
import { ItemController } from './item/items.controller';
import { ItemModule } from './item/item.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    // Load .env globally                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CategoryModule,
    ItemModule,
    // Database config using ConfigService (Approach #1)
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities:[Item,Category],
        autoLoadEntities: true,
        synchronize: true,      
      }),
    }),
  ],
  controllers:[CategoryController,ItemController]
})
export class AppModule {}
