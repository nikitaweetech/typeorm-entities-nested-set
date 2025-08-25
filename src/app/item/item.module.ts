import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/category.entity';
import { Item } from './item.entity';
import { ItemService } from './items.service';

@Module({
    imports:[TypeOrmModule.forFeature([Category,Item])],
    providers:[ItemService],
    exports:[ItemService]
})
export class ItemModule {}
