import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.model';
import { IResponseMessages, IChangePassword } from '../interfaces.global';
@Injectable()
export class UserService {
    constructor (
        @InjectModel('User') private readonly userModel: Model<User>,
    ) { }
    private readonly responseMessages: IResponseMessages<User> = {
        whenSaveSuccess: (user: User): object =>
            Object({
                message: 'User created!',
                email: user.email,
            }),
        whenUpdateSuccess: (user: User): object =>
            Object({
                message: 'User updated!',
                data: user,
            }),
        whenRemoveSuccess: (): object =>
            Object({
                message: 'User deleted!',
            }),
        whenChangePasswordSucess: (user: User): object =>
            Object({
                message: 'Password Updated!',
                data: user,
            }),
    }

    async create(data: User) {
       data.password = bcrypt.hashSync(data.password, 10); // https://medium.com/@bhanushali.mahesh3/building-a-restful-crud-api-with-node-js-jwt-bcrypt-express-and-mongodb-4e1fb20b7f3d <- para comparacao de senhas 
       const result = await new this.userModel(data).save();
       return this.responseMessages.whenSaveSuccess(result);
    }

    async findAll() {
        const result = await this.userModel.find();
        return result;
    }
     
    async findUser(email: String | string): Promise<User> {
        const user = await this.userModel.findOne({ email });
        return user;
    }

    async edit (data: User) {
        delete data.password;
        const filter = { email: data.email };
        const update = data;
        const result = 
            await this.userModel.findOneAndUpdate(filter, update, { new: true });
        return this.responseMessages.whenUpdateSuccess(result);
    }

    async remove (email: String) {
        const user = await this.findUser(email);
        await this.userModel.deleteOne(user);
        return this.responseMessages.whenRemoveSuccess();
    }

    async changePassord(data: IChangePassword) {
        const filter = { email: data.email };
        const newCriptoPassword = bcrypt.hashSync(data.newPassword, 10);
        const update = { password: newCriptoPassword }

        const user = await this.userModel.findOneAndUpdate(
            filter,
            update,
            { new: true },
        );

        return this.responseMessages.whenChangePasswordSucess(user);
    }
}
