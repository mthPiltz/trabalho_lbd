import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Teste } from './teste';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly teste: Teste) {}

  @Get()
  getHello(): string {
    return `
    <html>
      <body><div><button id="btn">logar</button></div></body>
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

  @Get('teste')
  getTeste() {
    return { message:'sucesso!'}
  }
}
