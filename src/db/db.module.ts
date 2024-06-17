import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "123",
      database: "postgres",
      entities: ['dist/db/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: ["error", "info", "log"]
    })
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DbModule {
}