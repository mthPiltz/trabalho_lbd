import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryImageEntity } from "../imagens/category-image.entity";
import { EntidadeBase } from "../entidade-base";

@Entity('category')
export class CategoryEntity extends EntidadeBase<CategoryEntity>{
  @PrimaryGeneratedColumn({name: 'id', primaryKeyConstraintName: 'pk_category'})
  id: number;

  @Column({name: 'href', type: 'varchar', length: 255, nullable: true})
  href: string;

  @Column({name: 'name', type: 'varchar', length: 255, nullable: true})
  name: string;

  @OneToMany(() => CategoryImageEntity, categoryImage => categoryImage.category, {cascade: true, createForeignKeyConstraints: true})
  category_images: CategoryImageEntity[];
}