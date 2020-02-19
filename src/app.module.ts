import { Module, DynamicModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { User } from './users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { KEYS } from './config';

let typeOrmModule: DynamicModule;

function bootstrap() {
  if (!typeOrmModule) {
    typeOrmModule = TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      type: 'mongodb',
      url: KEYS.mongo_url,
      entities: [User],
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
    })
  }
  return typeOrmModule;
}
@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      playground: true,
    }),
    bootstrap(),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
