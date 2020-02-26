import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';

interface ILogin {
    email: string | String;
}

@Injectable()
export class LoginService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async singIn(data: ILogin) {
        return this.jwtService.sign({ email: data.email });
    }

    async validateUser(data: ILogin): Promise<User> {
        return await this.userService.findUser(data.email);
    }
}
