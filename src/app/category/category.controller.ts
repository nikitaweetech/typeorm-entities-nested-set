import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create( @Body() body: { name: string; parentId?: string }) {
    return this.categoryService.create(body.name, body.parentId);
  }

  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }
  @Get('/all-trees')
  async getAllTrees(){
    return this.categoryService.getAllTrees();
  }

   @Get('/all-roots')
  async getAllRoots(){
    return this.categoryService.getAllRoots();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }
  @Get('/decendents/:id')
  async findDescendants(@Param('id') id: string) {
    return this.categoryService.findDescendants(id);
  }
}
