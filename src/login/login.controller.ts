import {
    Controller,
    Body,
    Post,
    Put,
    HttpCode,
    HttpException,
    HttpStatus
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { LoginService } from './login.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { validateChangePasswordData } from './login.validator';
import { ILogin, IChangePassword } from '../interfaces.global';


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

    @Put('change-password/')
    async changePassord (@Body() data: IChangePassword) {
        const invalidData = await validateChangePasswordData(data);
        if (invalidData) {
            throw new HttpException(invalidData.message, HttpStatus.BAD_REQUEST);
        }        
        const user: User = await this.userService.findUser(data.email);

        const result  = user;
        result.password = '';

        return result;
    }
}
