import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LoginService } from './login.service';
import { JWT_KEY } from 'src/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly loginService: LoginService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_KEY,
    });
  }

  async validate(jwtExtractedData: string) {
    const user = await this.loginService.validateUser({ email: jwtExtractedData });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
