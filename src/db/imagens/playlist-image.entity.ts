import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseImageEntity } from "./base-image-entity";
import { PlaylistEntity } from "../entidades/playlist.entity";

@Entity('playlist_image')
export class PlaylistImageEntity extends BaseImageEntity {
  @PrimaryGeneratedColumn({ name: 'playlist_image_id', primaryKeyConstraintName: 'pk_playlist_image' })
  id: number;

  @ManyToOne(() => PlaylistEntity, playlist => playlist.images)
  @JoinColumn({ name: 'playlist_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_playlist_image_playlist' })
  playlist: PlaylistEntity;
}