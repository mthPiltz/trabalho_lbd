import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseImageEntity } from "./base-image-entity";
import { ChapterEntity } from "../entidades/chapter.entity";

@Entity('chapter_image')
export class ChapterImageEntity extends BaseImageEntity {

  @PrimaryGeneratedColumn({ name: 'id', primaryKeyConstraintName: 'pk_chapter_image'})
  id: number;

  @ManyToOne(() => ChapterEntity, chapter => chapter.images)
  @JoinColumn({ name: 'chapter_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_chapter_image_chapter'})
  chapter: ChapterEntity;
}