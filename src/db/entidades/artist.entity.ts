import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EntidadeBase } from "../entidade-base";
import { AlbumEntity } from "./album.entity";
import { ArtistImageEntity } from "../imagens/artist-image.entity";
import { GenresEntity } from "./genres.entity";
import { TrackEntity } from "./track.entity";

@Entity("artist")
export class ArtistEntity extends EntidadeBase<ArtistEntity> {
  @PrimaryGeneratedColumn({ name: "id", primaryKeyConstraintName: "pk_artist" })
  id: number;

  @Column({ name: "external_url_spotify", type: "varchar", length: 255, nullable: true })
  external_url_spotify: string;

  @Column({ name: "href_followares", type: "varchar", length: 255, nullable: true })
  href_followares: string;

  @Column({ name: "total_followares", type: "int", nullable: true })
  total_followares: number;

  @Column({ name: "href", type: "varchar", length: 255, nullable: true })
  href: string;

  @Column({ name: "name", type: "varchar", length: 255, nullable: true })
  name: string;

  @Column({ name: "popularity", type: "int", nullable: true })
  popularity: number;

  @Column({ name: "type", type: "varchar", length: 15, nullable: true })
  type: string;

  @Column({ name: "uri", type: "varchar", length: 255, nullable: true })
  uri: string;

  @OneToMany(() => ArtistImageEntity, image => image.artist)
  images: ArtistImageEntity[];

  @ManyToMany(() => GenresEntity, genres => genres.artists)
  genres: GenresEntity[];

  @ManyToMany(() => AlbumEntity, album => album.artists)
  @JoinTable({
    name: "artist_album",
    joinColumn: {
      name: "artist_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_artist_album_artist",
    },
    inverseJoinColumn: {
      name: "album_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_artist_album_album",
    },
  })
  albums: AlbumEntity[];

  @ManyToMany(() => TrackEntity, track => track.artists)
  @JoinTable({
    name: "artist_track",
    joinColumn: {
      name: "artist_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_artist_track_artist",
    },
    inverseJoinColumn: {
      name: "track_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_artist_track_track",
    },
  })
  tracks: TrackEntity[];

}