import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Repository } from "typeorm";
import { AlbumEntity } from "./db/entidades/album.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AlbumImageEntity } from "./db/imagens/album-image.entity";

@Injectable()
export class AppService {

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>
  ) {
  }

  async getTopArtists(access_token : string) {
    const url = 'https://api.spotify.com/v1/me/top/artists?limit=10&offset=0'
    const headers = {
      'Authorization': 'Bearer ' + access_token
    }

    const response = await firstValueFrom(
      this.httpService.get(url, { headers }));

    return response.data
  }

  async teste() {
    const album = new AlbumEntity({
      name: 'Album 1',
      release_date: new Date(),
      images: [
        new AlbumImageEntity({
          url: 'url',
          height: 100,
          width: 100
        })
      ]
    });

    await this.albumRepository.save(album)
  }
}
