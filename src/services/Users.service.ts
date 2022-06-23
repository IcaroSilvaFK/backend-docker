import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

import { IUsersRepository } from '../repositories/interfaces/UserRepository.interface';
import {
  IUserProps,
  IUsersService,
} from './interfaces/Users.Service.interface';

export class UserService implements IUsersService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async create({ email, password, userName }: IUserProps): Promise<User> {
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
  async findMany(): Promise<User[]> {
    const allUsers = await this.usersRepository.findMany();
    return allUsers;
  }
}
