import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { InjectRepository } from "@nestjs/typeorm";
import { ArtistEntity } from "./db/entidades/artist.entity";
import { Repository } from "typeorm";
import { ArtistImageEntity } from "./db/imagens/artist-image.entity";
import { ConfigService } from "@nestjs/config";
import { TrackEntity } from "./db/entidades/track.entity";
import { MarketEntity } from "./db/entidades/market.entity";
import { AlbumEntity } from "./db/entidades/album.entity";
import { CategoryEntity } from "./db/entidades/category.entity";
import { CategoryImageEntity } from "./db/imagens/category-image.entity";
import { GenresEntity } from "./db/entidades/genres.entity";

@Injectable()
export class AppService {

  constructor(
    private readonly httpService: HttpService,
    private readonly envConfig: ConfigService,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
    @InjectRepository(MarketEntity)
    private readonly marketRepository: Repository<MarketEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoieRepository: Repository<CategoryEntity>,
    @InjectRepository(GenresEntity)
    private readonly genreRepository: Repository<GenresEntity>,
  ) {
  }

  async getAccessToken(_code: string) {
    const client_id = this.envConfig.get("client_id"),
      secret_id = this.envConfig.get("secret_id"),
      code = _code;
    const url = "https://accounts.spotify.com/api/token";

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "http://localhost:3030/callback",
    });

    const headers = {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(client_id + ":" + secret_id, "binary").toString("base64"),
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, body.toString(), { headers }),
      );
      this.envConfig.set("access_token", response.data.access_token);
      this.getTopArtists(10, 0);
    } catch (error) {
      console.error("Error Response:", error.response ? error.response.data : error.message);
      throw error;
    }
  }

  private async getUserTopItems(item: string, range: string, limit: number, offset: number) {
    const url = `https://api.spotify.com/v1/me/top/${ item }?time_range=${ range }&limit=${ limit }&offset=${ offset }`;
    const headers = {
      "Authorization": "Bearer " + this.envConfig.get("access_token"),
    };

    return await firstValueFrom(
      this.httpService.get(url, { headers }));
  }

  public async getTopArtists(limit: number, offset: number) {
    this.getCategories();

    const response: any = await this.getUserTopItems("artists", "long_term", limit, offset);

    response.data.items.forEach(async e => {
      const tracks = await this.topTracksArtist(e.id);
      const albuns = await this.topAlbunsArtist(e.id);
      const images = e.images.map(e => {
        return new ArtistImageEntity({
          url: e.url,
          width: e.width,
          height: e.height,
        });
      });

      const artist = new ArtistEntity({
        id: e.id,
        external_url_spotify: e.external_urls.spotify,
        href_followares: e.followers.href ?? "",
        total_followares: e.followers.total,
        href: e.href,
        name: e.name,
        popularity: e.popularity,
        type: e.type,
        uri: e.uri,
        images: images,
        tracks: tracks,
        albums: albuns,
      });

      try {
        await this.artistRepository.save(artist);
      } catch (error) {
        console.log(error);
      }

    });

    if (response.data.items.length == 10)
      await this.getTopArtists(limit, offset + 10);

    return response.data;
  }

  public async topTracksArtist(artist_id: string): Promise<TrackEntity[]> {
    const url = `https://api.spotify.com/v1/artists/${ artist_id }/top-tracks`;
    const headers = {
      "Authorization": "Bearer " + this.envConfig.get("access_token"),
    };

    const response = await firstValueFrom(
      this.httpService.get(url, { headers }));

    const trackPromises = response.data.tracks.map(async e => {
      const exist = await this.trackRepository.findOne({ where: { id: e.id } });
      if (!exist)
        return new TrackEntity({
          id: e.id,
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

  public async topAlbunsArtist(artist_id: string): Promise<AlbumEntity[]> {
    const url = `https://api.spotify.com/v1/artists/${ artist_id }/albums?include_groups=album`;
    const headers = {
      "Authorization": "Bearer " + this.envConfig.get("access_token"),
    };

    const response = await firstValueFrom(
      this.httpService.get(url, { headers }));

    const albumPromise = response.data.items.map(async e => {
      const exist = await this.albumRepository.findOne({ where: { id: e.id } });
      if (!exist) {
        return new AlbumEntity({
          id: e.id,
          album_type: e.album_type,
          total_tracks: e.total_tracks,
          external_url_spotify: e.external_urls.spotify,
          href: e.href,
          name: e.name,
          release_date: e.release_date,
          release_date_precision: e.release_date_precision,
          type: e.type,
          uri: e.uri,
          label: "",
        });
      }
    });

    const albuns = await Promise.all(albumPromise);
    return albuns.filter(albuns => albuns !== undefined) as AlbumEntity[];
  }

  public async getCategories(): Promise<void> {
    const url = "https://api.spotify.com/v1/browse/categories?locale=sv_BR";
    const headers = {
      "Authorization": "Bearer " + this.envConfig.get("access_token"),
    };

    const response = await firstValueFrom(
      this.httpService.get(url, { headers }));

    response.data.categories.items.forEach(e => {
      const images = e.icons.map(e => {
        return new CategoryImageEntity({
          id: e.id,
          url: e.url,
          height: e.height,
          width: e.width,
        });
      });

      const categorieEntity = new CategoryEntity({
        id: e.id,
        href: e.href,
        name: e.name,
        category_images: images,
      });

      this.categoieRepository.save(categorieEntity);
    });
  }

  public async getPlaylists() {
    //await this.getCategories();

    const categories = await this.categoieRepository.find({
      select: {
        id: true
      }
    });

    categories.forEach(async (e, index) => {
      const url = `https://api.spotify.com/v1/browse/categories/${e.id}/playlists`;
      const headers = {
        'Authorization': 'Bearer ' + this.envConfig.get('access_token')
      }

      if (index > 1) {
        return;
      }
      const response = await firstValueFrom(
        this.httpService.get(url, { headers }));

      response.data.playlists.items.forEach(async (e, index) => {
        let track: TrackEntity[] = [];
        if (index > 1)
          return;
        const response_items = await firstValueFrom(
          this.httpService.get(e.tracks.href + '?limit=2&offset=0', { headers }));


        let tracks_added = []
        response_items.data.items.forEach(async i => {
          if (i.track.type == 'episode')
            return;

          const exist = await this.trackRepository.find({ select: { id: true }, where: { id: i.track.id } });
          if (exist.length == 0 && !tracks_added.find(e => e == i.track.id)) {
            tracks_added.push(i.track.id);
            let artist;
            if (i.track.artists) {
              track.push(new TrackEntity({
                id: i.track.id,
                disc_number: i.track.disc_number,
                duration_ms: i.track.duration_ms,
                explicit: i.track.explicit,
                external_url_spotify: i.track.external_urls.spotify,
                href: i.track.href,
                is_playable: true,
                restriction_reason: i.track.restrictions ? i.track.restrictions.reason : "",
                name: i.track.name,
                popularity: i.track.popularity,
                preview_url: i.track.preview_url,
                track_number: i.track.track_number,
                type: i.track.type,
                uri: i.track.uri,
                is_local: i.track.is_local
              }));

              const exist_artist = await this.artistRepository.find({ select: { id: true }, where: { id: i.track.artists[0].id } });
              if (exist_artist.length == 0) {
                artist = [new ArtistEntity({
                  id: i.track.artists[0].id,
                  external_url_spotify: i.track.artists[0].external_urls.spotify,
                  href_followares: '',
                  total_followares: i.track.artists[0].followers ? i.track.artists[0].followers.total : 0,
                  href: i.track.artists[0].href,
                  name: i.track.artists[0].name,
                  popularity: i.track.artists[0].popularity ?? 0,
                  type: i.track.artists[0].type,
                  uri: i.track.artists[0].uri,
                  tracks: track
                })];

                try {
                  await this.artistRepository.save(artist);
                } catch (error) {
                  console.log(error);
                }
              }
            }
            else {
              return
            }
          }
        });
      });
    });
  }

  async getMarkets() {
    const url = 'https://api.spotify.com/v1/markets';
    const headers = {
      "Authorization": "Bearer " + this.envConfig.get("access_token"),
    };
    const response = await firstValueFrom(this.httpService.get(url, { headers }));

    response.data.markets.forEach(e => {
      const market = new MarketEntity({
        type: e,
      });

      this.marketRepository.save(market);
    });

    return response.data;
  }

  async getGenres() {
    const url = "https://api.spotify.com/v1/recommendations/available-genre-seeds";
    const headers = {
      "Authorization": "Bearer " + this.envConfig.get("access_token")
    };
    const response = await fetch(url, { headers, method: "GET" });
    const genresDto= (await response.json()).genres;

    for (const genre of genresDto) {
      const genreEntity = new GenresEntity({description: genre});

      await this.genreRepository.save(genreEntity)
    }
  }
}
