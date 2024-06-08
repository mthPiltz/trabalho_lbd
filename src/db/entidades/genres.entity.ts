import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { EntidadeBase } from "../entidade-base";
import { AlbumEntity } from "./album.entity";
import { ArtistEntity } from "./artist.entity";

@Entity("genres")
export class GenresEntity extends EntidadeBase<GenresEntity> {
  @PrimaryGeneratedColumn({ name: "id", primaryKeyConstraintName: "pk_genres" })
  id: number;

  @Column({ name: "description", type: "varchar", length: 255, nullable: true })
  description: string;


  @ManyToMany(() => AlbumEntity, album => album.genres)
  @JoinTable({
    name: "album_genres",
    joinColumn: {
      name: "genres_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_album_genres_genres",
    },
    inverseJoinColumn: {
      name: "album_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_album_genres_album",
    },
  })
  albums: AlbumEntity[];

  @ManyToMany(() => ArtistEntity, artist => artist.genres)
  @JoinTable({
    name: "artist_genres",
    joinColumn: {
      name: "genres_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_artist_genres_genres",
    },
    inverseJoinColumn: {
      name: "artist_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_artist_genres_artist",
    },
  })
  artists: ArtistEntity[];
}