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

  private async getUserTopItems(item : string, range : string, limit : number, offset : number){
    const url = `https://api.spotify.com/v1/me/top/${item}?time_range=${range}&limit=${limit}&offset=${offset}`
    const headers = {
      'Authorization': 'Bearer ' + this.envConfig.get('access_token')
    }

    return await firstValueFrom(
      this.httpService.get(url, { headers }));
  }

  public async getTopArtists(limit : number, offset : number) {
    const response : any = await this.getUserTopItems('artists', 'long_term', limit, offset);
  
    response.data.items.forEach(async e => {
      const tracks = await this.topTracksArtist(e.id);
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
        href_followares : e.followers.href ?? "",
        total_followares : e.followers.total,
        href : e.href,
        name : e.name,
        popularity : e.popularity,
        type : e.type,
        uri : e.uri,
        images : images,
        tracks : tracks,
      });
      
      
      await this.artistRepository.save(artist);
    });

    if(response.data.items.length == 10)
      await this.getTopArtists(limit, offset + 10)

    return response.data
  }

  public async topTracksArtist(artist_id : string) : Promise<TrackEntity[]> {
    const url = `https://api.spotify.com/v1/artists/${artist_id}/top-tracks`
    const headers = {
      'Authorization': 'Bearer ' + this.envConfig.get('access_token')
    }

    const response = await firstValueFrom(
      this.httpService.get(url, { headers }));

      const trackPromises = response.data.tracks.map(async e => {
      const exist = await this.trackRepository.findOne({where : {id : e.id}});
      if(!exist)
        return new TrackEntity({
          id : e.id,
          disc_number: e.disc_number,
          duration_ms: e.duration_ms,
          explicit: e.explicit,
          external_url_spotify: e.external_urls.spotify,
          href: e.href,
          is_playable: e.is_playable,
          restriction_reason: e.restrictions ? e.restrictions.reason : "",
          name: e.name,
          popularity: e.popularity,
          preview_url: e.preview_url,
          track_number: e.track_number,
          type: e.type,
          uri: e.uri,
          is_local: e.is_local,
        });
    });

    const tracks = await Promise.all(trackPromises);
    return tracks.filter(track => track !== undefined) as TrackEntity[];
  }

  public async getTopTracks(limit : number, offset : number){
    const response : any = await this.getUserTopItems('tracks', 'short_term',limit, offset);

    response.data.items.forEach(async e => {
      

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
        // markets : markets,
        // artists : artist
      });

      // await this.trackRepository.save(track);
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
