import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Category } from '../category/category.entity';
@Entity('item')
export class Item{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string;

    @ManyToOne(()=>Category,category=>category.items)
    category: Category;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;
}