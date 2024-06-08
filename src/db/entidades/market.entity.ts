import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ShowEntity } from "./show.entity";

@Entity("market")
export class MarketEntity {

  @PrimaryGeneratedColumn({ name: "id", primaryKeyConstraintName: "pk_market" })
  id: number;

  @Column({ name: "type", type: "varchar", length: 255 })
  type: string;

  @ManyToMany(() => ShowEntity, show => show.markets, {createForeignKeyConstraints: true})
  @JoinTable({
    name: "show_has_market",
    joinColumn: {
      name: "market_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_show_has_market_market",
    },
    inverseJoinColumn: {
      name: "show_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_show_has_market_show",
    }
  })
  shows: ShowEntity[];

}