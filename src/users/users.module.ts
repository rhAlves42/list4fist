import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';

const ENTITIES = [User]

@Module({
    imports: [
        TypeOrmModule.forFeature(ENTITIES),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class UserModule {}