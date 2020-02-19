import { User } from './users.entity';
import { IResponseMessages } from '../global.interfaces';
import { Injectable } from '@nestjs/common';
import {
    MongoRepository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInput } from './users.input';

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User)
        private readonly userRepository: MongoRepository<User>,
    ) { }

    private readonly responseMessages: IResponseMessages<User> = {
        whenSaveSuccess: (user: User): object =>
            Object({
                message: 'Usuário salvo com sucesso',
                email: user.email,
            })
    }

    async create(input: UserInput): Promise<User> {
        // TODO: Passar validacao e criacao de hash
        const user = new User();
        user.name = input.name;
        user.email = input.email;
        user.phone = input.phone;
        user.password = input.password;
        user.status = input.status;
        user.urlFrontagePhoto = input.urlFrontagePhoto;
        user.role = input.role;
        await this.userRepository.save(user);
        return this.responseMessages.whenSaveSuccess(user);
     }
}