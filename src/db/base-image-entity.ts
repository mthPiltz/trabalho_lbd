import { EntidadeBase } from "./entidade-base";
import { Column } from "typeorm";

export class BaseImageEntity extends EntidadeBase<BaseImageEntity> {

  @Column({ name: 'url', type: 'varchar', length: 255 })
  url: string;

  @Column({ name: 'height', type: 'int' })
  height: number;

  @Column({ name: 'width', type: 'int' })
  width: number;

}