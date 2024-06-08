import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlbumEntity } from "./entidades/album.entity";
import { ArtistEntity } from "./entidades/artist.entity";
import { AudiobookEntity } from "./entidades/audiobook.entity";
import { CategoryEntity } from "./entidades/category.entity";
import { ChapterEntity } from "./entidades/chapter.entity";
import { CopyrightEntity } from "./entidades/copyright.entity";
import { EpisodeEntity } from "./entidades/episode.entity";
import { ExternalIdEntity } from "./entidades/external-id.entity";
import { GenresEntity } from "./entidades/genres.entity";
import { MarketEntity } from "./entidades/market.entity";
import { PlaylistEntity } from "./entidades/playlist.entity";
import { ShowEntity } from "./entidades/show.entity";
import { TrackEntity } from "./entidades/track.entity";
import { UserEntity } from "./entidades/user.entity";

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "123",
      database: "postgres",
      entities: ['dist/db/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true
    }),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class DbModule {
}