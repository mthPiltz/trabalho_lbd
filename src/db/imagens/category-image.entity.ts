import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "../entidades/category.entity";
import { EntidadeBase } from "../entidade-base";

@Entity('category_image')
export class CategoryImageEntity extends EntidadeBase<CategoryImageEntity> {

  @PrimaryGeneratedColumn({name: 'id', primaryKeyConstraintName: 'pk_category_image'})
  id: number;

  @Column({name: 'url', type: 'varchar', length: 255})
  url: string;

  @Column({name: 'height', type: 'int'})
  height: number;

  @Column({name: 'width', type: 'int'})
  width: number;

  @ManyToOne(() => CategoryEntity, category => category.category_images, {createForeignKeyConstraints: true})
  @JoinColumn({name: 'category_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_category_image'})
  category: CategoryEntity;
}