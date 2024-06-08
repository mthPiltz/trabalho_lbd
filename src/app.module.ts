import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DbModule } from "./db/db.module";

@Module({
  imports: [ConfigModule.forRoot(), DbModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
