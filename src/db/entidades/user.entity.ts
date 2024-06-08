import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EntidadeBase } from "../entidade-base";
import { PlaylistEntity } from "./playlist.entity";
import { UserImageEntity } from "../imagens/user-image.entity";

@Entity('user')
export class UserEntity extends EntidadeBase<UserEntity> {

  @PrimaryGeneratedColumn({ name: 'user_id', primaryKeyConstraintName: 'pk_user' })
  id: number;

  @Column({ name: 'external_url_spotify', type: 'varchar', length: 255 })
  external_url_spotify: string;

  @Column({ name: 'href_followers', type: 'varchar', length: 255 })
  href_followers: string;

  @Column({ name: 'total_followers', type: 'int' })
  total_followers: number;

  @Column({name: 'href', type: 'varchar', length: 255})
  href: string;

  @Column({ name: 'type', type: 'varchar', length: 15 })
  type: string;

  @Column({ name: 'uri', type: 'varchar', length: 255 })
  uri: string;

  @Column({ name: 'display_name', type: 'varchar', length: 255 })
  display_name: string;

  @Column({ name: 'email', type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'country', type: 'varchar', length: 2 })
  country: string;

  @Column({ name: 'filter_enabled', type: 'boolean' })
  filter_enabled: boolean;

  @Column({ name: 'filter_locked', type: 'boolean' })
  filter_locked: boolean;

  @Column({ name: 'product', type: 'varchar', length: 50 })
  product: string;

  @OneToMany(() => PlaylistEntity, playlist => playlist.user)
  playlist: PlaylistEntity[];

  @OneToMany(() => UserImageEntity, userImage => userImage.user)
  images: UserImageEntity[];
}