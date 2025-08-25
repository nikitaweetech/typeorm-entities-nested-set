import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, TreeRepository } from 'typeorm';
import { Category } from './category.entity';


@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async create(name: string, parentId?: string): Promise<Category> {
    const category = this.categoryRepo.create({ name });

    if (parentId) {
      const parent = await this.categoryRepo.findOne({ where: { id: parentId } });
      if (parent) {
        category.parent = parent;
      }
    }

    return this.categoryRepo.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepo.find({ relations: ['children'] });
  }

  async findOne(id: string) {
    return this.categoryRepo.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });
  }

  async getAllTrees(){
    let result;
    result=await this.dataSource.manager.getTreeRepository(Category).findTrees();
    console.log('Getting all roots with children  ',result);
    //result= await this.dataSource.manager.getTreeRepository(Category).findTrees({depth:2});
    console.log('Getting all roots with children upto 2 depth  ',result);
    return result;
  }

  async getAllRoots(){
    const result=await this.dataSource.manager.getTreeRepository(Category).findRoots();
    console.log('Getting all roots with (entities which don\'t have ancestors)  ',result);
    // returns root categories without sub categories inside
    return result;
  }

async findDescendants(id: string) {
  const treeRepo = this.dataSource.getTreeRepository(Category);

  const category = await treeRepo.findOne({
    where: { id },
  });

  if (!category) {
    throw new Error('Category not found');
  }

  const descendants = await treeRepo.findDescendants(category);
  console.log('Descendants:', descendants);
  const childrenCount = await this.dataSource.manager
    .getTreeRepository(Category)
    .countDescendants(category);
    console.log('childrenCount',childrenCount);

    const ans = await treeRepo.findAncestorsTree(category);
     console.log('Ancenstor',ans);
  return descendants;
}
}
