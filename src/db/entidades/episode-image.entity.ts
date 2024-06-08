import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EpisodeEntity } from "./episode.entity";
import { EntidadeBase } from "../entidade-base";

@Entity({ name: 'episode_image' })
export class EpisodeImageEntity extends EntidadeBase<EpisodeImageEntity>{

  @PrimaryGeneratedColumn({ name: 'id', primaryKeyConstraintName: 'pk_episode_image' })
  id: number;

  @Column({ name: 'url', type: 'varchar', length: 255 })
  url: string;

  @Column({ name: 'height', type: 'int' })
  height: number;

  @Column({ name: 'width', type: 'int' })
  width: number;

  @ManyToOne(() => EpisodeEntity, episode => episode.episode_images)
  @JoinColumn({name: 'episode_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_category_image'})
  episode: EpisodeEntity

}