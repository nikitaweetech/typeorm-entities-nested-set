import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ItemService } from './items.service';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async create(@Body() body: { name: string; categoryId: string }) {
    return this.itemService.create(body.name, body.categoryId);
  }

  @Get()
  async findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.itemService.findOne(id);
  }
}
