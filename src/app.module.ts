import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Teste } from './teste';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, Teste],
})
export class AppModule {}
