import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWT_KEY } from '../config';
import { UserModule } from '../user/user.module';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { JwtStrategy } from './jwt.strategy';

const jwtRegister = JwtModule.register({
    secret: JWT_KEY,
    signOptions: { expiresIn: "15 days" }
})

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        jwtRegister,
        UserModule,
    ],
    providers: [LoginService, JwtStrategy],
    exports: [PassportModule, LoginService],
    controllers: [LoginController],
})

export class LoginModule {}
