import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { DbModule } from "./db/db.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArtistEntity } from './db/entidades/artist.entity';
import { GenresEntity } from './db/entidades/genres.entity';
import { ArtistImageEntity } from './db/imagens/artist-image.entity';
import { TrackEntity } from './db/entidades/track.entity';
import { MarketEntity } from './db/entidades/market.entity';


@Module({
  imports: [
    ConfigModule.forRoot(), 
    DbModule, 
    HttpModule,
    TypeOrmModule.forFeature([
      ArtistEntity,
      GenresEntity,
      ArtistImageEntity,
      TrackEntity,
      MarketEntity
    ])],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
