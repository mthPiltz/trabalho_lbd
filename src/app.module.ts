import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { DbModule } from "./db/db.module";

@Module({
  imports: [ConfigModule.forRoot(), DbModule, HttpModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
