import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  
  constructor(
    private readonly httpService: HttpService) {
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
}
