import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './db/entidades/artist.entity';
import { Repository } from 'typeorm';
import { ArtistImageEntity } from './db/imagens/artist-image.entity';
import { ConfigService } from '@nestjs/config';
import { TrackEntity } from './db/entidades/track.entity';
import { MarketEntity } from './db/entidades/market.entity';

@Injectable()
export class AppService {

  constructor(
    private readonly httpService: HttpService,
    private readonly envConfig: ConfigService,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository : Repository<ArtistEntity>,
    @InjectRepository(TrackEntity)
    private readonly trackRepository : Repository<TrackEntity>,
    @InjectRepository(MarketEntity)
    private readonly marketEntity : Repository<MarketEntity>
  ) {
  }

  async getAccessToken(_code : string){
    const client_id = this.envConfig.get('client_id'),
          secret_id = this.envConfig.get('secret_id'),
          code = _code;
    const url = 'https://accounts.spotify.com/api/token';
    
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'http://localhost:3030/callback',
    });

    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(client_id + ':' + secret_id, 'binary').toString('base64')
    };
    
    try {
      const response = await firstValueFrom(
        this.httpService.post(url, body.toString(), { headers })
      );
      this.envConfig.set('access_token', response.data.access_token);
    } catch (error) {
      console.error('Error Response:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  private async getUserTopItems(item : string){
    const url = `https://api.spotify.com/v1/me/top/${item}?limit=10&offset=0`
    const headers = {
      'Authorization': 'Bearer ' + this.envConfig.get('access_token')
    }

    return await firstValueFrom(
      this.httpService.get(url, { headers }));
  }

  public async getTopArtists() {
    const response : any = await this.getUserTopItems('artists');
  
    response.data.items.forEach(async e => {
      const images = e.images.map(e => {
        return new ArtistImageEntity({
          url : e.url,
          width : e.width,
          height : e.height
        });
      });

      const artist = new ArtistEntity({
        id : e.id,
        external_url_spotify : e.external_urls,
        href_followares : e.followers.href,
        total_followares : e.followers.total,
        href : e.href,
        name : e.name,
        popularity : e.popularity,
        type : e.type,
        uri : e.uri,
        images : images
      });
      console.log(artist);
      // await this.artistRepository.save(artist);
    });
    
    return response.data
  }

  public async getTopTracks(){
    const response : any = await this.getUserTopItems('tracks');

    response.data.items.forEach(async e => {
      const markets = e.album.available_markets.map(e => {
        return new MarketEntity({
          type : e
        });
      });

      const artist = e.album.artists.map(e => {
        return new ArtistEntity({
          id : e.id,
          name : e.name,
          type : e.type,
          uri : e.uri
        });
      });

      const track = new TrackEntity({
        id : e.id,
        disc_number : e.disc_number,
        duration_ms : e.duration_ms,
        explicit  : e.explicit,
        external_url_spotify : e.external_urls.spotify,
        href : e.href,
        is_playable : true, // não retorna da API
        restriction_reason : "",
        name : e.name,
        popularity : e.popularity,
        preview_url : e.preview_url,
        track_number : e.track_number,
        type : e.type,  
        uri : e.uri,
        is_local : e.is_local,
        markets : markets,
        artists : artist
      });

      console.log(track);
    });

    return response.data;
  }

  async getMarkets(){
    const url = 'https://api.spotify.com/v1/markets'
    const headers = {
      'Authorization': 'Bearer ' + this.envConfig.get('access_token')
    }
    const response = await firstValueFrom(this.httpService.get(url, { headers }));
    
    response.data.markets.forEach(e => {
      const market = new MarketEntity({
        type : e
      });

      this.marketEntity.save(market);
    });

    return response.data;
  }
}
