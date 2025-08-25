import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { Category } from '../category/category.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepo: Repository<Item>,
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(name: string, categoryId: string) {
    const category = await this.categoryRepo.findOne({ where: { id: categoryId } });
    if(!category){
        throw new Error('Category Not found');
    }
    const item = this.itemRepo.create({ name, category });
    return this.itemRepo.save(item);
  }

  async findAll(): Promise<Item[]> {
    return this.itemRepo.find({ relations: ['category'] });
  }

  async findOne(id: string){
    return this.itemRepo.findOne({
      where: { id },
      relations: ['category'],
    });
  }
}
