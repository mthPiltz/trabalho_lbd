import { Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EntidadeBase } from "../entidade-base";
import { ArtistEntity } from "./artist.entity";
import { AlbumEntity } from "./album.entity";
import { MarketEntity } from "./market.entity";
import { ExternalIdEntity } from "./external-id.entity";

@Entity('track')
export class TrackEntity extends EntidadeBase<TrackEntity> {

  @PrimaryGeneratedColumn({ name: 'track_id', primaryKeyConstraintName: 'pk_track' })
  id: number;

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
}