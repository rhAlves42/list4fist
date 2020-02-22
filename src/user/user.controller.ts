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
import { validateUser } from './users.validator';

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
        return this.service.edid(user);
    }
    
    @Delete('/delete')
    @HttpCode(200)
    async deleteUser(@Query('email') email: String) {
        return await this.service.remove(email);
    }
    
}
