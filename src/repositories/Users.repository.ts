import { prismaClient } from '../configs/prisma';
import {
  IUserProps,
  IUsersRepository,
} from './interfaces/UserRepository.interface';

export class UsersRepository implements IUsersRepository {
  async create({ email, password, userName }: IUserProps) {
    const newUser = await prismaClient.user.create({
      data: {
        userName,
        email,
        password,
      },
    });

    return newUser;
  }
  async update(id: string, data: Partial<IUserProps>) {
    const updatedUser = await prismaClient.user.update({
      where: {
        id,
      },
      data,
    });

    return updatedUser;
  }

  async delete(id: string) {
    await prismaClient.user.delete({
      where: {
        id,
      },
    });
  }
  async findMany() {
    const allUsers = await prismaClient.user.findMany();

    return allUsers;
  }
}
