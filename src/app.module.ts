import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { KEYS } from './config';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    MongooseModule.forRoot(KEYS.mongo_url),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
