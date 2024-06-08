import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseImageEntity } from "./base-image-entity";
import { AlbumEntity } from "../entidades/album.entity";

@Entity('album_image')
export class AlbumImageEntity extends BaseImageEntity {

  @PrimaryGeneratedColumn({ name: 'id', primaryKeyConstraintName: 'pk_album_image' })
  id: number;

  @ManyToOne(() => AlbumEntity, album => album.images)
  @JoinColumn({ name: 'album_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_album_image_album' })
  album: AlbumEntity;

}