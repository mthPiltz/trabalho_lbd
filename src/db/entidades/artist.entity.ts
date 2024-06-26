import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn,  } from "typeorm";
import { EntidadeBase } from "../entidade-base";
import { AlbumEntity } from "./album.entity";
import { ArtistImageEntity } from "../imagens/artist-image.entity";
import { GenresEntity } from "./genres.entity";
import { TrackEntity } from "./track.entity";
import { exitCode } from "process";

@Entity("artist")
export class ArtistEntity extends EntidadeBase<ArtistEntity> {
  @PrimaryColumn({ name: "id", type: 'varchar', primaryKeyConstraintName: "pk_artist" })
  id: string;

  @Column({ name: 'external_url_spotify', type: 'varchar', length: 255 })
  external_url_spotify: string;

  @Column({name: 'href_followares', type: 'varchar', length: 255})
  href_followares: string;

  @Column({ name: 'total_followares', type: 'int'})
  total_followares: number;

  @Column({name: 'href', type: 'varchar', length: 255})
  href: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'popularity', type: 'int'})
  popularity: number;

  @Column({ name: 'type', type: 'varchar', length: 15 })
  type: string;

  @Column({ name: 'uri', type: 'varchar', length: 255 })
  uri: string;

  @OneToMany(() => ArtistImageEntity, image => image.artist, { cascade: true })
  images: ArtistImageEntity[];

  @ManyToMany(() => GenresEntity, genres => genres.artists)
  genres: GenresEntity[];

  @ManyToMany(() => AlbumEntity, album => album.artists, { cascade: true })
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

  @ManyToMany(() => TrackEntity, track => track.artists, { cascade: true })
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