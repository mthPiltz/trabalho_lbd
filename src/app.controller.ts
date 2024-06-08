import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import { Buffer } from "buffer";
import { firstValueFrom } from 'rxjs';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, 
    private readonly envConfig: ConfigService,
    private readonly httpService: HttpService) {}

  @Get()
  getHello(): string {
    const client_id = this.envConfig.get('client_id')
    return `
    <html lang="pt-br">
      <body>
        <div>
          <a href='https://accounts.spotify.com/authorize?response_type=code&client_id=${ client_id }&scope=user-read-private user-read-email user-top-read&redirect_uri=http://localhost:3030/callback'>Logar</a>
        </div>
      </body>
      <script>
        const btn = document.getElementById("btn");
        btn.addEventListener("click" ,async (e) => {
          e.preventDefault();
          const response = await fetch("http://localhost:3030/teste");
          console.log(await response.json());
        });
      </script>
    </html>
    `;
  }

  @Get('callback')
  async getTeste(@Req() req: Request) {
    const client_id = this.envConfig.get('client_id'),
          secret_id = this.envConfig.get('secret_id'),
          code = req.query.code as string;
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
            
      return this.appService.getTopArtists(response.data.access_token);
    } catch (error) {
      console.error('Error Response:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  @Get('teste')
  async teste() {
    return this.appService.teste();
  }
}
