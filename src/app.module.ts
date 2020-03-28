import { Module, DynamicModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';

let typeOrmModule: DynamicModule;

function bootstrap(): DynamicModule {
  if (!typeOrmModule) {
    typeOrmModule = TypeOrmModule.forRoot();
  }
  return typeOrmModule;
}

@Module({
  imports: [
    bootstrap(),
    UserModule,
    LoginModule
  ],
  providers: [],
})
export class AppModule {}
