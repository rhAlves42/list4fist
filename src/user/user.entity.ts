import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

export enum Role {
  ADMIN = 1,
}

export enum Status {
  ACTIVE = 0,
  INACTIVE = 1,
}

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 11 })
  phone: string;

  @Column({ length: 32 })
  password: string;

  @Column({ nullable: true })
  hashChangePassword?: string;

  @Column({ nullable: true })
  dateChangePassword?: string;

  @Column()
  role: Role;

  @Column()
  status: Status;

}
