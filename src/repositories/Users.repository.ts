import { Prisma, User } from '@prisma/client';
import { prismaClient } from '../configs/prisma';
import { AppError } from '../Errors/App.error';
import {
  IUserProps,
  IUsersRepository,
} from './interfaces/UserRepository.interface';

export class UsersRepository implements IUsersRepository {
  async create({ email, password, userName }: IUserProps) {
    const userExists = await prismaClient.user.findFirst({
      where: { email },
    });

    if (userExists) {
      throw new AppError('User exists in database', 400);
    }

    try {
      const newUser = await prismaClient.user.create({
        data: {
          userName,
          email,
          password,
        },
        select: {
          email: true,
          id: true,
          userName: true,
          password: true,
        },
      });

      return newUser;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new AppError(err.message, 500);
      }
      throw new AppError('Internal server error', 500);
    }
  }
  async update(id: string, data: Partial<IUserProps>) {
    try {
      const updatedUser = await prismaClient.user.update({
        where: {
          id,
        },
        data,
      });

      return updatedUser;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new AppError(err.message, 500);
      }
      throw new AppError('Internal server error', 500);
    }
  }

  async delete(id: string) {
    try {
      await prismaClient.user.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new AppError(err.message, 500);
      }
      throw new AppError('Internal server error', 500);
    }
  }
  async findMany() {
    try {
      const allUsers = await prismaClient.user.findMany({
        select: {
          email: true,
          userName: true,
          orders: true,
        },
      });

      return allUsers;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new AppError(err.message, 500);
      }
      throw new AppError('Internal server error', 500);
    }
  }
  async login(email: string): Promise<User> {
    try {
      const user = await prismaClient.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        throw new AppError('User not exists in', 404);
      }

      return user;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new AppError(err.message, 500);
      }
      throw new AppError('Internal server error', 500);
    }
  }
}
