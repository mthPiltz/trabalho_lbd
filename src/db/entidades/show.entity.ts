import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EntidadeBase } from "../entidade-base";
import { ShowImageEntity } from "../imagens/show-image.entity";
import { EpisodeEntity } from "./episode.entity";
import { CopyrightEntity } from "./copyright.entity";
import { MarketEntity } from "./market.entity";

@Entity({ name: 'show' })
export class ShowEntity extends EntidadeBase<ShowEntity> {

  @PrimaryGeneratedColumn({ name: 'id', primaryKeyConstraintName: 'pk_show' })
  id: number;

  @Column({ name: 'external_url_spotify', type: 'varchar', length: 255 })
  external_url_spotify: string;

  @Column({ name: 'description', type: 'varchar', length: 1500 })
  description: string;

  @Column({ name: 'html_description', type: 'varchar', length: 1600 })
  html_description: string;

  @Column({name: 'href', type: 'varchar', length: 255})
  href: string;

  @Column({ name: 'explicit', type: 'boolean' })
  explicit: boolean;

  @Column({ name: 'is_externally_hosted', type: 'boolean' })
  is_externally_hosted: boolean;

  @Column({ name: 'languages', array: true, type: 'varchar', length: 15})
  languages: string[];

  @Column({ name: 'media_type', type: 'varchar', length: 100 })
  media_type: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'publisher', type: 'varchar', length: 255 })
  publisher: string;

  @Column({ name: 'type', type: 'varchar', length: 15 })
  type: string;

  @Column({ name: 'uri', type: 'varchar', length: 255 })
  uri: string;

  @Column({ name: 'total_episodes', type: 'int' })
  total_episodes: number;

  @OneToMany(() => ShowImageEntity, showImage => showImage.show, { cascade: true, createForeignKeyConstraints: true })
  @JoinColumn({ foreignKeyConstraintName: 'fk_show_image'})
  show_images: ShowImageEntity[];

  @OneToMany(() => EpisodeEntity, episode => episode.show, { cascade: false, createForeignKeyConstraints: true })
  episodes: EpisodeEntity[]

  @ManyToMany(() => CopyrightEntity, copyright => copyright.shows, {createForeignKeyConstraints: true})
  copyrights: CopyrightEntity[]

  @ManyToMany(() => MarketEntity, market => market.shows, {createForeignKeyConstraints: true})
  markets: MarketEntity[];
}