import { Post, Body, Controller } from '@nestjs/common';
import { UserService } from './users.service';


@Controller('user')
export class UserController {
    constructor (
        private readonly userService: UserService,
    ) { }
    
    @Post()
    async createUser(@Body() data) {
        const result = await this.userService.create(data);
        return result;
    }
}
