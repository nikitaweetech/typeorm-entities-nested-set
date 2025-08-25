import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from 'typeorm';
import { Item } from '../item/item.entity';
@Entity('category')
@Tree('nested-set')
export class Category{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string;

    @TreeParent()
    parent:Category;

    @TreeChildren()
    children:Category[];

    @OneToMany(() => Item, (item) => item.category)
    items: Item[];
}