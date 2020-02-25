import {
    Controller,
    Post,
    Body,
    Get,
    HttpCode,
    Query,
    HttpException,
    HttpStatus,
    Put,
    Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import {
    validateUser,
    validateChangePasswordData,
    validateForgotPasswordData,

} from './users.validator';
import { IChangePassword, IForgotPassword } from '../interfaces.global';
import { validateUserPassword } from './user.utils';


@Controller('user')
export class UserController {
    constructor(private service: UserService) {}

    private async validatePayload (user: User) {
        const invalidUser = await validateUser(user);
        if (invalidUser) {
            console.log(invalidUser)
            throw new HttpException(invalidUser.message, HttpStatus.BAD_REQUEST);
        }        
    }

    @Post('/create')
    async create(@Body() user: User) {

        const alreadyRegistered = await this.service.findUser(user.email);

        if (alreadyRegistered) {
            throw new HttpException('Email already registered!', HttpStatus.CONFLICT);
        }

        await this.validatePayload(user);

        return await this.service.create(user);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return await this.service.findAll();
    }

    @Get('/find')
    @HttpCode(200)
    async findUser(@Query('email') email: String): Promise<User> {
        return await this.service.findUser(email);
    }

    @Put()
    async editUser(@Body() user: User) {
        await this.validatePayload(user);
        return this.service.edit(user);
    }
    
    @Delete('/delete')
    @HttpCode(200)
    async deleteUser(@Query('email') email: String) {
        return await this.service.remove(email);
    }

    @Put('change-password/')
    async changePassord (@Body() data: IChangePassword) {
        const { email, currentPassword, newPassword } = data;
        const invalidData = await validateChangePasswordData(data);
        if (invalidData) {
            throw new HttpException(invalidData.message, HttpStatus.BAD_REQUEST);
        }

        const user = await this.service.findUser(data.email);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        
        const { password } = user;
        const isValidCurrentPassword = validateUserPassword({
            currentPassword,
            dbPassword: password.toString(),
        });

        if (!isValidCurrentPassword) {
            throw new HttpException('Incorrect current password.', HttpStatus.UNAUTHORIZED);
        }

        const result = await this.service.changePassord({
            email, 
            currentPassword,
            newPassword,
        });

        return result;
    }

    @Post('forgot-password/')
    async forgotPassword (@Body() data: IForgotPassword) {
        const { email } = data;
        
        const invalidData = await validateForgotPasswordData({ email });
        if (invalidData) {
            throw new HttpException(invalidData.message, HttpStatus.BAD_REQUEST);
        }

        const user = await this.findUser(email);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        // TODO: Enviar email com o link de recuperar senha
        // Possivel programa: Varrer um cod e criar tasks com base nos comentários
        const linkRecover = 'https://recuperarsenha.com.br';
        return linkRecover;
    }
    
}
