import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { KEYS } from './config';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';
import { defaultconfig } from './database/database.providers';
@Module({
  imports: [
    MongooseModule.forRoot(KEYS.mongo_url, defaultconfig),
    UserModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
