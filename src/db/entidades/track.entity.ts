import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { EntidadeBase } from "../entidade-base";
import { ArtistEntity } from "./artist.entity";
import { AlbumEntity } from "./album.entity";
import { MarketEntity } from "./market.entity";
import { ExternalIdEntity } from "./external-id.entity";
import { PlaylistEntity } from "./playlist.entity";

@Entity('track')
export class TrackEntity extends EntidadeBase<TrackEntity> {

  @PrimaryColumn({ name: 'track_id', type: 'varchar', primaryKeyConstraintName: 'pk_track' })
  id: string;

  @Column({ name: 'disc_number', type: 'int' })
  disc_number: number;

  @Column({ name: 'duration_ms', type: 'int' })
  duration_ms: number;

  @Column({ name: 'explicit', type: 'boolean' })
  explicit: boolean;

  @Column({ name: 'external_url_spotify', type: 'varchar', length: 255 })
  external_url_spotify: string;

  @Column({name: 'href', type: 'varchar', length: 255})
  href: string;

  @Column({ name: 'is_playable', type: 'boolean' })
  is_playable: boolean;

  @Column({ name: 'restriction_reason', type: 'varchar', length: 255, nullable: true })
  restriction_reason: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'popularity', type: 'int' })
  popularity: number;

  @Column({ name: 'preview_url', type: 'varchar', length: 255 })
  preview_url: string;

  @Column({ name: 'track_number', type: 'int' })
  track_number: number;

  @Column({ name: 'type', type: 'varchar', length: 15 })
  type: string;

  @Column({ name: 'uri', type: 'varchar', length: 255 })
  uri: string;

  @Column({ name: 'is_local', type: 'boolean' })
  is_local: boolean;

  @ManyToMany(() => MarketEntity, market => market.tracks, {createForeignKeyConstraints: true})
  markets: MarketEntity[];

  @ManyToMany(() => ArtistEntity, artist => artist.tracks)
  artists: ArtistEntity[];

  @ManyToOne(() => AlbumEntity, album => album.tracks)
  @JoinColumn({ name: 'album_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_track_album' })
  album: AlbumEntity;

  @ManyToOne(() => ExternalIdEntity, external_id => external_id.tracks)
  @JoinColumn({ name: 'external_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_track_external_id' })
  external_id: ExternalIdEntity;

  @ManyToOne(() => PlaylistEntity, playlist => playlist.tracks)
  @JoinColumn({ name: 'playlist_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_track_playlist' })
  playlist: PlaylistEntity;
}