import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseImageEntity } from "../base-image-entity";
import { ArtistEntity } from "./artist.entity";

@Entity("artist_image")
export class ArtistImageEntity extends BaseImageEntity {
  @PrimaryGeneratedColumn({ name: "id", primaryKeyConstraintName: "pk_artist_image" })
  id: number;

  @ManyToOne(() => ArtistEntity, artist => artist.images, { createForeignKeyConstraints: true })
  @JoinColumn({ name: "artist_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_artist_image_artist" })
  artist: ArtistEntity;
}