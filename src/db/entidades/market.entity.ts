import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ShowEntity } from "./show.entity";
import { EntidadeBase } from "../entidade-base";
import { ChapterEntity } from "./chapter.entity";
import { AudiobookEntity } from "./audiobook.entity";
import { AlbumEntity } from "./album.entity";
import { TrackEntity } from "./track.entity";

@Entity("market")
export class MarketEntity extends EntidadeBase<MarketEntity> {

  @PrimaryGeneratedColumn({ name: "id", primaryKeyConstraintName: "pk_market" })
  id: number;

  @Column({ name: "type", type: "varchar", length: 255, nullable: true })
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

  @ManyToMany(() => ChapterEntity, chapter => chapter.markets, {createForeignKeyConstraints: true})
  @JoinTable({
    name: "chapter_has_market",
    joinColumn: {
      name: "market_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_chapter_has_market_market",
    },
    inverseJoinColumn: {
      name: "chapter_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_chapter_has_market_chapter",
    }
  })
  chapters: ChapterEntity[];

  @ManyToMany(() => AudiobookEntity, audiobook => audiobook.markets, {createForeignKeyConstraints: true})
  @JoinTable({
    name: "audiobook_has_market",
    joinColumn: {
      name: "market_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_audiobook_has_market_market",
    },
    inverseJoinColumn: {
      name: "audiobook_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_audiobook_has_market_audiobook",
    }
  })
  audiobooks: AudiobookEntity[];

  @ManyToMany(() => AlbumEntity, album => album.markets, {createForeignKeyConstraints: true})
  @JoinTable({
    name: "album_has_market",
    joinColumn: {
      name: "market_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_album_has_market_market",
    },
    inverseJoinColumn: {
      name: "album_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_album_has_market_album",
    }
  })
  albums: AlbumEntity[];

  @ManyToMany(() => TrackEntity, track => track.markets, {createForeignKeyConstraints: true})
  @JoinTable({
    name: "track_has_market",
    joinColumn: {
      name: "market_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_track_has_market_market",
    },
    inverseJoinColumn: {
      name: "track_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "fk_track_has_market_track",
    }
  })
  tracks: TrackEntity[];
}