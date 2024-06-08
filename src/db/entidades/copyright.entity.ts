import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ShowEntity } from "./show.entity";
import { EntidadeBase } from "../entidade-base";
import { AudiobookEntity } from "./audiobook.entity";
import { AlbumEntity } from "./album.entity";

@Entity('copyright')
export class CopyrightEntity extends EntidadeBase<CopyrightEntity> {
  @PrimaryGeneratedColumn({ name: 'id', primaryKeyConstraintName: 'pk_copyright' })
  id: number;

  @Column({ name: 'text', type: 'varchar', length: 255 })
  text: string;

  @Column({ name: 'type', type: 'varchar', length: 255 })
  type: string;

  @ManyToMany(() => ShowEntity, show => show.copyrights, {createForeignKeyConstraints: true})
  @JoinTable({
    name: 'show_has_copyright',
    joinColumn: {
      name: 'copyright_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_show_has_copyright_copyright',
    },
    inverseJoinColumn: {
      name: 'show_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_show_has_copyright_show',
    }
  })
  shows: ShowEntity[];

  @ManyToMany(() => AudiobookEntity, audiobook => audiobook.copyrights)
  @JoinTable({
    name: 'audiobook_has_copyright',
    joinColumn: {
      name: 'copyright_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_audiobook_has_copyright_copyright',
    },
    inverseJoinColumn: {
      name: 'audiobook_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_audiobook_has_copyright_audiobook',
    }
  })
  audiobooks: AudiobookEntity[];

  @ManyToMany(() => AlbumEntity, album => album.copyrights)
  @JoinTable({
    name: 'album_has_copyright',
    joinColumn: {
      name: 'copyright_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_album_has_copyright_copyright',
    },
    inverseJoinColumn: {
      name: 'album_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_album_has_copyright_album',
    }
  })
  albums: AlbumEntity[];
}