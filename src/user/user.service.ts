import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User, Status } from './user.entity';
import { IResponseMessages, IChangePassword } from '../interfaces.global';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {}
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
  };

  async create(data: User) {
    data.password = bcrypt.hashSync(data.password, 10); // https://medium.com/@bhanushali.mahesh3/building-a-restful-crud-api-with-node-js-jwt-bcrypt-express-and-mongodb-4e1fb20b7f3d <- para comparacao de senhas
    const newUser =  new User();
    newUser.password = data.password;
    newUser.save();
  }

  async findAll() {
    const result = await this.userRepository.find();
    return result;
  }

  async findUser(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    return user;
  }

  async edit(data: User) {
    delete data.password;
    await this.userRepository.update(data.email, data);
    // return this.responseMessages.whenUpdateSuccess(result);
  }

  async remove(email: string) {
    await this.userRepository.update(email, { status: Status.INACTIVE });
  }

  async changePassord(data: IChangePassword) {
    const { email, dbPassword } = data;

    const newCriptoPassword = bcrypt.hashSync(data.newPassword, 10);
    const update = {
      password: newCriptoPassword,
      lastPasswordChangeDate: +new Date(),
      lastPassword: dbPassword,
    };

    await this.userRepository.update(email, update);
  }
}
