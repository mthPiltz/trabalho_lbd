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
    return this.appService.getAccessToken(req.query.code as string);
  }

  @Get('artists')
  async getArtists(){
    return this.appService.getTopArtists(10, 0);
  }

  @Get('markets')
  async getMarkets(){
    return this.appService.getMarkets();
  }
}
