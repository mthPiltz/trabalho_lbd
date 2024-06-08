import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EntidadeBase } from "../entidade-base";
import { ChapterEntity } from "./chapter.entity";
import { CopyrightEntity } from "./copyright.entity";
import { AudiobookImageEntity } from "../imagens/audiobook-image.entity";
import { MarketEntity } from "./market.entity";

@Entity("audiobook")
export class AudiobookEntity extends EntidadeBase<AudiobookEntity> {
  @PrimaryGeneratedColumn({ name: "id", primaryKeyConstraintName: "pk_audiobook" })
  id: number;

  @Column({ name: "authors", array: true, type: "varchar", length: 15, nullable: true })
  authors: string[];

  @Column({ name: "description", type: "varchar", length: 1500, nullable: true })
  description: string;

  @Column({ name: "html_description", type: "varchar", length: 1600, nullable: true })
  html_description: string;

  @Column({ name: "edition", type: "varchar", length: 50, nullable: true })
  edition: string;

  @Column({ name: "explicit", type: "boolean", nullable: true })
  explicit: boolean;

  @Column({ name: "external_url_spotify", type: "varchar", length: 255, nullable: true })
  external_url_spotify: string;

  @Column({ name: "href", type: "varchar", length: 255, nullable: true })
  href: string;

  @Column({ name: "languages", array: true, type: "varchar", length: 15, nullable: true })
  languages: string[];

  @Column({ name: "media_type", type: "varchar", length: 100, nullable: true })
  media_type: string;

  @Column({ name: "name", type: "varchar", length: 255, nullable: true })
  name: string;

  @Column({ name: "narrators", array: true, type: "varchar", length: 15, nullable: true })
  narrators: string[];

  @Column({ name: "publisher", type: "varchar", length: 100, nullable: true })
  publisher: string;

  @Column({ name: "type", type: "varchar", length: 15, nullable: true })
  type: string;

  @Column({ name: "uri", type: "varchar", length: 255, nullable: true })
  uri: string;

  @ManyToMany(() => MarketEntity, market => market.audiobooks, { createForeignKeyConstraints: true })
  markets: MarketEntity[];

  @OneToMany(() => AudiobookImageEntity, image => image.audiobook)
  images: AudiobookImageEntity[];

  @ManyToMany(() => CopyrightEntity, copyright => copyright.shows, { createForeignKeyConstraints: true })
  copyrights: CopyrightEntity[];

  @OneToMany(() => ChapterEntity, chapter => chapter.audiobook)
  chapters: ChapterEntity[];
}