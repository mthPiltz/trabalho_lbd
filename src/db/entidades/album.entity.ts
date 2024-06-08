import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EntidadeBase } from "../entidade-base";
import { CopyrightEntity } from "./copyright.entity";
import { AlbumImageEntity } from "../imagens/album-image.entity";
import { MarketEntity } from "./market.entity";
import { GenresEntity } from "./genres.entity";
import { ArtistEntity } from "./artist.entity";
import { TrackEntity } from "./track.entity";
import { ExternalIdEntity } from "./external-id.entity";

@Entity('album')
export class AlbumEntity extends EntidadeBase<AlbumEntity> {

  @PrimaryGeneratedColumn({ name: 'id', primaryKeyConstraintName: 'pk_album' })
  id: number;

  @Column({ name: 'album_type', type: 'varchar', length: 50 })
  album_type: string;

  @Column({ name: 'total_tracks', type: 'int'})
  total_tracks: number;

  @Column({ name: 'external_url_spotify', type: 'varchar', length: 255 })
  external_url_spotify: string;

  @Column({name: 'href', type: 'varchar', length: 255})
  href: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'release_date', type: 'date' })
  release_date: Date;

  @Column({ name: 'release_date_precision', type: 'varchar', length: 15 })
  release_date_precision: string;

  @Column({ name: 'type', type: 'varchar', length: 15 })
  type: string;

  @Column({ name: 'uri', type: 'varchar', length: 255 })
  uri: string;

  @Column({ name: 'label', type: 'varchar', length: 255 })
  label: string;

  @ManyToMany(() => CopyrightEntity, copyright => copyright.albums)
  copyrights: CopyrightEntity[];

  @OneToMany(() => AlbumImageEntity, image => image.album)
  images: AlbumImageEntity[];

  @ManyToMany(() => MarketEntity, market => market.albums, {createForeignKeyConstraints: true})
  markets: MarketEntity[];

  @ManyToMany(() => GenresEntity, genres => genres.albums)
  genres: GenresEntity[];

  @ManyToMany(() => ArtistEntity, artist => artist.albums)
  artists: ArtistEntity[];

  @OneToMany(() => TrackEntity, track => track.album)
  tracks: TrackEntity[];

  @ManyToOne(() => ExternalIdEntity, external_id => external_id.albums)
  @JoinColumn({ name: 'external_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_album_external_id'})
  external_id: ExternalIdEntity;
}