import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EntidadeBase } from "../entidade-base";
import { ShowImageEntity } from "../imagens/show-image.entity";
import { EpisodeEntity } from "./episode.entity";
import { CopyrightEntity } from "./copyright.entity";
import { MarketEntity } from "./market.entity";

@Entity({ name: "show" })
export class ShowEntity extends EntidadeBase<ShowEntity> {

  @PrimaryGeneratedColumn({ name: "id", primaryKeyConstraintName: "pk_show" })
  id: number;

  @Column({ name: "external_url_spotify", type: "varchar", length: 255, nullable: true })
  external_url_spotify: string;

  @Column({ name: "description", type: "varchar", length: 1500, nullable: true })
  description: string;

  @Column({ name: "html_description", type: "varchar", length: 1600, nullable: true })
  html_description: string;

  @Column({ name: "href", type: "varchar", length: 255, nullable: true })
  href: string;

  @Column({ name: "explicit", type: "boolean", nullable: true })
  explicit: boolean;

  @Column({ name: "is_externally_hosted", type: "boolean", nullable: true })
  is_externally_hosted: boolean;

  @Column({ name: "languages", array: true, type: "varchar", length: 15, nullable: true })
  languages: string[];

  @Column({ name: "media_type", type: "varchar", length: 100, nullable: true })
  media_type: string;

  @Column({ name: "name", type: "varchar", length: 255, nullable: true })
  name: string;

  @Column({ name: "publisher", type: "varchar", length: 255, nullable: true })
  publisher: string;

  @Column({ name: "type", type: "varchar", length: 15, nullable: true })
  type: string;

  @Column({ name: "uri", type: "varchar", length: 255, nullable: true })
  uri: string;

  @Column({ name: "total_episodes", type: "int", nullable: true })
  total_episodes: number;

  @OneToMany(() => ShowImageEntity, showImage => showImage.show, { cascade: true, createForeignKeyConstraints: true })
  @JoinColumn({ foreignKeyConstraintName: "fk_show_image" })
  show_images: ShowImageEntity[];

  @OneToMany(() => EpisodeEntity, episode => episode.show, { cascade: false, createForeignKeyConstraints: true })
  episodes: EpisodeEntity[];

  @ManyToMany(() => CopyrightEntity, copyright => copyright.shows, { createForeignKeyConstraints: true })
  copyrights: CopyrightEntity[];

  @ManyToMany(() => MarketEntity, market => market.shows, { createForeignKeyConstraints: true })
  markets: MarketEntity[];
}