import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './users.entity';
import { UserService } from './users.service';
import { UserInput } from './users.input';

@Resolver('Users')
export class UsersResolver {
    @Query(() => String)
    async hello() {
        return 'world'
    }

    @Mutation(()=> User)
    async createUser (@Args('input') input: UserInput) {
        return await this.userService.create(input);
    }
}
