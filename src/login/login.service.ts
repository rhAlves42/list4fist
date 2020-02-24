import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { IChangePassword } from '../interfaces.global';

interface ILogin {
    email: string;
}

@Injectable()
export class LoginService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly userModel: Model<User>,
    ) { }

    async singIn(data: ILogin) {
        return this.jwtService.sign({ email: data.email });
    }

    async validateUser(data: ILogin): Promise<User> {
        return await this.userService.findUser(data.email);
    }

    async changePassord(data: IChangePassword) {
        const filter = { email: data.email };
        const newCriptoPassword = bcrypt.hashSync(data.newPassword, 10);
        const user = await this.userModel.findByIdAndUpdate(filter, newCriptoPassword, { new: true });
        return user;
    }
}
