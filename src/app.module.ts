import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { DbModule } from "./db/db.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlbumEntity } from "./db/entidades/album.entity";
import { ArtistEntity } from "./db/entidades/artist.entity";
import { AudiobookEntity } from "./db/entidades/audiobook.entity";
import { CategoryEntity } from "./db/entidades/category.entity";
import { ChapterEntity } from "./db/entidades/chapter.entity";
import { CopyrightEntity } from "./db/entidades/copyright.entity";
import { EpisodeEntity } from "./db/entidades/episode.entity";
import { ExternalIdEntity } from "./db/entidades/external-id.entity";
import { GenresEntity } from "./db/entidades/genres.entity";
import { MarketEntity } from "./db/entidades/market.entity";
import { PlaylistEntity } from "./db/entidades/playlist.entity";
import { ShowEntity } from "./db/entidades/show.entity";
import { TrackEntity } from "./db/entidades/track.entity";
import { UserEntity } from "./db/entidades/user.entity";

@Module({
  imports: [ConfigModule.forRoot(), DbModule, HttpModule, TypeOrmModule.forFeature([
    AlbumEntity,
    ArtistEntity,
    AudiobookEntity,
    CategoryEntity,
    ChapterEntity,
    CopyrightEntity,
    EpisodeEntity,
    ExternalIdEntity,
    GenresEntity,
    MarketEntity,
    PlaylistEntity,
    ShowEntity,
    TrackEntity,
    UserEntity
  ])],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
