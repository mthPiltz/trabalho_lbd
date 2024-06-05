import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly envConfig: ConfigService) {}

  @Get()
  getHello(): string {
    const client_id = this.envConfig.get('client_id')
    return `
    <html>
      <body>
        <div>
          <a href='https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=user-read-private user-read-email user-top-read&redirect_uri=http://localhost:3030/callback'>Logar</a>
        </div>
      </body>
      <script>
        const btn = document.getElementById('btn');
        btn.addEventListener('click' ,async (e) => {
          e.preventDefault();
          const response = await fetch('http://localhost:3030/teste')
          console.log(await response.json())
        })
      </script>
    </html>
    `;
  }

  @Get('callback')
  getTeste() {
    const url = 'https://api.spotify.com/v1/me/top/artists'
  }
}
