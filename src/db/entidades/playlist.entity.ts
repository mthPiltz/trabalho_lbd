import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EntidadeBase } from "../entidade-base";
import { TrackEntity } from "./track.entity";
import { PlaylistImageEntity } from "../imagens/playlist-image.entity";
import { UserEntity } from "./user.entity";

@Entity('playlist')
export class PlaylistEntity extends EntidadeBase<PlaylistEntity> {

  @PrimaryGeneratedColumn({ name: 'playlist_id', primaryKeyConstraintName: 'pk_playlist' })
  id: number;

  @Column({ name: 'external_url_spotify', type: 'varchar', length: 255 })
  external_url_spotify: string;

  @Column({ name: 'collaborative', type: 'boolean' })
  collaborative: boolean;

  @Column({ name: 'description', type: 'varchar', length: 1500 })
  description: string;

  @Column({ name: 'href_followers', type: 'varchar', length: 255 })
  href_followers: string;

  @Column({ name: 'total_followers', type: 'int' })
  total_followers: number;

  @Column({name: 'href', type: 'varchar', length: 255})
  href: string;

  @Column({ name: 'type', type: 'varchar', length: 15 })
  type: string;

  @Column({ name: 'uri', type: 'varchar', length: 255 })
  uri: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'public', type: 'boolean' })
  public: boolean;

  @Column({name: 'snapshot_id', type: 'varchar', length: 255})
  snapshot_id: string;

  @OneToMany(() => PlaylistImageEntity, image => image.playlist)
  images: PlaylistImageEntity[];

  @OneToMany(() => TrackEntity, track => track.playlist)
  tracks: TrackEntity[];

  @ManyToOne(() => UserEntity, user => user.playlist)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_playlist_user' })
  user: UserEntity;
}