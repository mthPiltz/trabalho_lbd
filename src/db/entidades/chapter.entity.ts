import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EntidadeBase } from "../entidade-base";
import { ChapterImageEntity } from "./chapter-image.entity";
import { MarketEntity } from "./market.entity";
import { AudiobookEntity } from "./audiobook.entity";

@Entity('chapter')
export class ChapterEntity extends EntidadeBase<ChapterEntity> {
  @PrimaryGeneratedColumn({ name: 'id', primaryKeyConstraintName: 'pk_chapter' })
  id: number;

  @Column({ name: 'audio_preview_url', type: 'varchar', length: 255 })
  audio_preview_url: string;

  @Column({ name: 'chapter_number', type: 'int' })
  chapter_number: number;

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

  @Column({ name: 'is_playable', type: 'boolean' })
  is_playable: boolean;

  @Column({ name: 'languages', array: true, type: 'varchar', length: 15})
  languages: string[];

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'release_date', type: 'date' })
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

  @OneToMany(() => ChapterImageEntity, chapterImage => chapterImage.chapter)
  images: ChapterImageEntity[];

  @ManyToMany(() => MarketEntity, market => market.chapters, {createForeignKeyConstraints: true})
  markets: MarketEntity[];

  @ManyToOne(() => AudiobookEntity, audiobook => audiobook.chapters)
  @JoinColumn({ name: 'audiobook_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_chapter_audiobook' })
  audiobook: AudiobookEntity;
}