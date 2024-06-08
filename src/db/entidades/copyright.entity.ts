import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ShowEntity } from "./show.entity";

@Entity('copyright')
export class CopyrightEntity {
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
}