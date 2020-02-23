import { Controller, Post, HttpCode, Body, HttpException, HttpStatus } from '@nestjs/common';
import { LoginService } from './login.service';
import { UserService } from '../user/user.service';
import { ILogin } from '../interfaces.global';
import { User } from '../user/user.model';
import * as bcrypt from 'bcrypt';

@Controller('login')
export class LoginController {
    constructor(
        private readonly loginService: LoginService,
        private readonly userService: UserService,
    ) { }

    @Post()
    @HttpCode(200)
    async login(@Body() login: ILogin): Promise<any> {
        const user: User = await this.userService.findUser(login.email);
        const hash = bcrypt.compareSync(login.password, user.password.toString())
        if (!user || !hash) {
            throw new HttpException(
                { error: { message: 'Email ou senha inválido(s)' } },
                HttpStatus.UNAUTHORIZED,
            );
        }
        const token = await this.loginService.singIn(user.email);

        const data = user;
        data.password = ''; // paliativo ate descobrir outra forma

        return {
            data,
            token
        };
    }
}
