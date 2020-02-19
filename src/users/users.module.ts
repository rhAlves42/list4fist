import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UserController } from "./users.controller";
import { UserService } from "./users.service";

const ENTITIES = [User]

@Module({
    imports: [
        TypeOrmModule.forFeature(ENTITIES),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}