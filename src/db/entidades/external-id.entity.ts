import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EntidadeBase } from "../entidade-base";
import { TrackEntity } from "./track.entity";
import { AlbumEntity } from "./album.entity";

@Entity('external_id')
export class ExternalIdEntity extends EntidadeBase<ExternalIdEntity> {
  @PrimaryGeneratedColumn({ name: 'id', primaryKeyConstraintName: 'pk_external_id' })
  id: number;

  @Column({ name: 'isrc', type: 'varchar', length: 255, nullable: true })
  isrc: string;

  @Column({ name: 'ean', type: 'varchar', length: 255, nullable: true })
  ean: string;

  @Column({ name: 'upc', type: 'varchar', length: 255, nullable: true })
  upc: string;

  @OneToMany(() => TrackEntity, track => track.external_id)
  tracks: TrackEntity[];

  @OneToMany(() => AlbumEntity, album => album.external_id)
  albums: AlbumEntity[];
}