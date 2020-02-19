import { User } from './users.entity';
import { IResponseMessages } from '../global.interfaces';
import { Injectable } from '@nestjs/common';
import {
    Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    private readonly responseMessages: IResponseMessages<User> = {
        whenSaveSuccess: (user: User): object =>
            Object({
                message: 'Usuário salvo com sucesso',
                email: user.email,
            })
    }

    async create(
        data: User,
     ) {
        // validations
        let user:User = this.userRepository.create(data);
        user = await this.userRepository.save(user);
        return this.responseMessages.whenSaveSuccess(user);
        
     }
}