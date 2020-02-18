import { User, Status, RoleType } from './users.entity';
import { IResponseMessages } from '../global.interfaces';
import { Injectable } from '@nestjs/common';
import { Repository, Transaction as TransactionDecorator } from 'typeorm';
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

    @TransactionDecorator()
}