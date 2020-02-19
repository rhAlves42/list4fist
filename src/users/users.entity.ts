import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { DateTime } from 'luxon';

export enum Status {
    INACTIVE = 0,
    ACTIVE = 1,
}

export enum RoleType {
    ADMIN = 1,
    PERSONAL = 2,
    DEFAULT = 3,
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        length: 300, nullable: false
    })
    name?: string;

   @Column({ length: 11, nullable: false })
    phone?: string;

    @Column({ length: 60, unique: true, nullable: false })
    email?: string;

    @Column({ length: 32, nullable: false })
    password?: string;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.ACTIVE,
    })
    status?: Status;

    @Column({
        name: 'url_profile_photo',
        type: 'varchar',
        length: '255',
        nullable: true,
    })
    urlFrontagePhoto?: string;

    @Column({ name: 'role', enum: RoleType, default: 1 })
    role?: RoleType;

    @Column({
    name: 'create_date',
    type: 'timestamptz',
    default: () =>
        DateTime.local()
        .toUTC(-180)
        .toString(),
    })
    createDate?: Date;
}