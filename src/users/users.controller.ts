import { Post, Body, Controller } from '@nestjs/common';
import { User } from './users.model'
import { UserService } from './users.service';
// https://medium.com/@adsonrocha/como-criar-um-backend-com-nestjs-integrado-mongodb-via-mongoose-828dbe0bf260

@Controller('user')
export class UserController {
    constructor (
        private readonly userService: UserService,
    ) { }
    
    @Post()
    async createUser(@Body() user: User) {
        const result = await this.userService.create(data);
        return result;
    }
}
