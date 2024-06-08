import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryImageEntity } from "./category-image.entity";
import { EntidadeBase } from "../entidade-base";

@Entity('category')
export class CategoryEntity extends EntidadeBase<CategoryEntity>{
  @PrimaryGeneratedColumn({name: 'id', primaryKeyConstraintName: 'pk_category'})
  id: number;

  @Column({name: 'href', type: 'varchar', length: 255})
  href: string;

  @Column({name: 'name', type: 'varchar', length: 255})
  name: string;

  @OneToMany(() => CategoryImageEntity, categoryImage => categoryImage.category, {cascade: true, createForeignKeyConstraints: true})
  category_images: CategoryImageEntity[];
}