import { Injectable } from '@nestjs/common';
import { CategoryEntity } from "./db/entidades/category.entity";

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
