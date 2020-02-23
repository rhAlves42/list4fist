import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class LoginService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async singIn(email: String) {
        return this.jwtService.sign({ email });
    }

    async validateUser(email: String): Promise<User> {
        return await this.userService.findUser(email);
    }
}
