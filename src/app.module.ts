import { Module, DynamicModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

let typeOrmModule: DynamicModule;

function bootstrap() {
  if (!typeOrmModule) {
    typeOrmModule = TypeOrmModule.forRoot({ keepConnectionAlive: true })
  }
  return typeOrmModule;
}
@Module({
  imports: [
    bootstrap(),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
