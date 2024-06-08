import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseImageEntity } from "./base-image-entity";
import { ShowEntity } from "../entidades/show.entity";

@Entity({ name: 'show_image' })
export class ShowImageEntity extends BaseImageEntity {

  @PrimaryGeneratedColumn({ name: 'id', primaryKeyConstraintName: 'pk_show_image' })
  id: number;

  @ManyToOne(() => ShowEntity, show => show.show_images)
  @JoinColumn({ name: 'show_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_show_image' })
  show: ShowEntity;

}