import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { EpisodeImageEntity } from "../imagens/episode-image.entity";
import { EntidadeBase } from "../entidade-base";
import { ShowEntity } from "./show.entity";

@Entity({ name: 'episode' })
export class EpisodeEntity extends EntidadeBase<EpisodeEntity> {

  @PrimaryColumn({ name: 'id', type: 'varchar', primaryKeyConstraintName: 'pk_episode' })
  id: string;

  @Column({ name: 'audio_preview_url', type: 'varchar', length: 255 })
  audio_preview_url: string;

  @Column({ name: 'description', type: 'varchar', length: 1500 })
  description: string;

  @Column({ name: 'html_description', type: 'varchar', length: 1600 })
  html_description: string;

  @Column({ name: 'duration_ms', type: 'int' })
  duration_ms: number;

  @Column({ name: 'explicit', type: 'boolean' })
  explicit: boolean;

  @Column({ name: 'external_url_spotify', type: 'varchar', length: 255 })
  external_url_spotify: string;

  @Column({name: 'href', type: 'varchar', length: 255})
  href: string;

  @Column({ name: 'is_externally_hosted', type: 'boolean' })
  is_externally_hosted: boolean;

  @Column({ name: 'is_playable', type: 'boolean' })
  is_playable: boolean;

  @Column({ name: 'language', type: 'varchar', length: 15 })
  language: string;

  @Column({ name: 'languages', array: true, type: 'varchar', length: 15})
  languages: string[];

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'se_date', type: 'date' })
  release_date: Date;

  @Column({ name: 'release_date_precision', type: 'varchar', length: 15 })
  release_date_precision: string;

  @Column({ name: 'resume_point_fully_played', type: 'boolean' })
  resume_point_fully_played: boolean;

  @Column({ name: 'resume_point_resume_position_ms', type: 'int' })
  resume_point_resume_position_ms: number;

  @Column({ name: 'type', type: 'varchar', length: 15 })
  type: string;

  @Column({ name: 'uri', type: 'varchar', length: 255 })
  uri: string;

  @Column({ name: 'restriction_reason', type: 'varchar', length: 255, nullable: true })
  restriction_reason: string;

  @OneToMany(() => EpisodeImageEntity, episodeImage => episodeImage.episode, {cascade: true, createForeignKeyConstraints: true})
  episode_images: EpisodeImageEntity[];

  @ManyToOne(() => ShowEntity, show => show.episodes)
  @JoinColumn({ name: 'show_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_episode_show'})
  show: ShowEntity;
}