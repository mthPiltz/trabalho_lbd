import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { CategoryImageEntity } from "../imagens/category-image.entity";
import { EntidadeBase } from "../entidade-base";

@Entity('category')
export class CategoryEntity extends EntidadeBase<CategoryEntity>{
  @PrimaryColumn({name: 'id', type : 'varchar', primaryKeyConstraintName: 'pk_category'})
  id: string;

  @Column({name: 'href', type: 'varchar', length: 255})
  href: string;

  @Column({name: 'name', type: 'varchar', length: 255})
  name: string;

  @OneToMany(() => CategoryImageEntity, categoryImage => categoryImage.category, {cascade: true, createForeignKeyConstraints: true})
  category_images: CategoryImageEntity[];
}