import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseImageEntity } from "./base-image-entity";
import { UserEntity } from "../entidades/user.entity";

@Entity('user_image')
export class UserImageEntity extends BaseImageEntity {

  @PrimaryGeneratedColumn({ name: 'user_image_id', primaryKeyConstraintName: 'pk_user_image' })
  id: number;

  @ManyToOne(() => UserEntity, user => user.images)
  user: UserEntity;
}