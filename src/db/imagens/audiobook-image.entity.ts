import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseImageEntity } from "./base-image-entity";
import { AudiobookEntity } from "../entidades/audiobook.entity";

@Entity('audiobook_image')
export class AudiobookImageEntity extends BaseImageEntity {
  @PrimaryGeneratedColumn({ name: 'id', primaryKeyConstraintName: 'pk_audiobook_image'})
  id: number;

  @ManyToOne(() => AudiobookEntity, audiobook => audiobook.images)
  @JoinColumn({ name: 'audiobook_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_audiobook_image_audiobook'})
  audiobook: AudiobookEntity;
}