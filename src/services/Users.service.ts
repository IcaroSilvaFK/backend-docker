import { Order, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { AppError } from '../Errors/App.error';

import { IUsersRepository } from '../repositories/interfaces/UserRepository.interface';
import {
  IUserProps,
  IUsersService,
} from './interfaces/Users.Service.interface';

export class UserService implements IUsersService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async create({
    email,
    password,
    userName,
  }: IUserProps): Promise<Partial<User>> {
    const paswordHash = await bcrypt.hash(password, 10);
    const newUser = await this.usersRepository.create({
      email,
      userName,
      password: paswordHash,
    });

    return newUser;
  }
  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
  async update(id: string, data: Partial<IUserProps>): Promise<User> {
    const updatedUser = await this.usersRepository.update(id, data);

    return updatedUser;
  }
  async findMany(): Promise<
    {
      userName: string;
      email: string;
      orders: Order[];
    }[]
  > {
    const allUsers = await this.usersRepository.findMany();
    return allUsers;
  }
  async login(email: string, password: string): Promise<Partial<User>> {
    const user = await this.usersRepository.login(email);

    const passwordmatch = await bcrypt.compare(password, user.password);

    if (!passwordmatch) {
      throw new AppError('Invalid email or password', 400);
    }

    delete user.password;

    return user;
  }
}
