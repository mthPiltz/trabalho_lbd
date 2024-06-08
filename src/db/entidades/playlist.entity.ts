import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EntidadeBase } from "../entidade-base";
import { TrackEntity } from "./track.entity";
import { PlaylistImageEntity } from "../imagens/playlist-image.entity";
import { UserEntity } from "./user.entity";

@Entity("playlist")
export class PlaylistEntity extends EntidadeBase<PlaylistEntity> {

  @PrimaryGeneratedColumn({ name: "playlist_id", primaryKeyConstraintName: "pk_playlist" })
  id: number;

  @Column({ name: "external_url_spotify", type: "varchar", length: 255, nullable: true })
  external_url_spotify: string;

  @Column({ name: "collaborative", type: "boolean", nullable: true })
  collaborative: boolean;

  @Column({ name: "description", type: "varchar", length: 1500, nullable: true })
  description: string;

  @Column({ name: "href_followers", type: "varchar", length: 255, nullable: true })
  href_followers: string;

  @Column({ name: "total_followers", type: "int", nullable: true })
  total_followers: number;

  @Column({ name: "href", type: "varchar", length: 255, nullable: true })
  href: string;

  @Column({ name: "type", type: "varchar", length: 15, nullable: true })
  type: string;

  @Column({ name: "uri", type: "varchar", length: 255, nullable: true })
  uri: string;

  @Column({ name: "name", type: "varchar", length: 255, nullable: true })
  name: string;

  @Column({ name: "public", type: "boolean", nullable: true })
  public: boolean;

  @Column({ name: "snapshot_id", type: "varchar", length: 255, nullable: true })
  snapshot_id: string;

  @OneToMany(() => PlaylistImageEntity, image => image.playlist)
  images: PlaylistImageEntity[];

  @OneToMany(() => TrackEntity, track => track.playlist)
  tracks: TrackEntity[];

  @ManyToOne(() => UserEntity, user => user.playlist)
  @JoinColumn({ name: "user_id", referencedColumnName: "id", foreignKeyConstraintName: "fk_playlist_user" })
  user: UserEntity;
}